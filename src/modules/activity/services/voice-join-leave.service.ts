import {randomUUID} from 'crypto'
import {Client, Collection, Guild, VoiceState} from 'discord.js'
import {ChannelId, GuildId, UserId} from '../../../types/base.type.js'
import SettingsActivityManager from '../../settings/activity/managers/settings-activity.manager.js'
import {VoiceDto} from '../dto/voice.dto.js'
import {ActivityFilter} from '../helpers/activityFilter.js'
import VoiceManager from '../managers/voice.manager.js'
import {VoiceModel} from '../models/voice.model.js'

interface JoinLeaveVoice {
    uuid: string
    guildId: GuildId
    channelId: ChannelId
    userId: UserId
    before: Date
    after?: Date
}

const collection = new Collection<string, JoinLeaveVoice>()

class _VoiceJoinLeaveService {
    constructor(private readonly collection: Collection<string, JoinLeaveVoice>) {}
    private deleteKey(guildId: GuildId, channelId: ChannelId, userId: UserId): boolean {
        const value = this.collection.findKey(i =>
            i.guildId === guildId && i.channelId === channelId && i.userId === userId && !i.after)
        return this.collection.delete(value)
    }
    private leaveJoin(collection: Collection<string, JoinLeaveVoice>, date: Date): void {
        collection.map((i, uuid) => {
            this.deleteKey(i.guildId, i.channelId, i.userId)
            this.set(uuid, i.guildId, i.channelId, i.userId, i.before, date)
            return this.join(i.guildId, i.channelId, i.userId)
        })
    }
    private set(
        uuid: string,
        guildId: GuildId,
        channelId: ChannelId,
        userId: UserId,
        before?: Date,
        date?: Date
    ): Collection<string, JoinLeaveVoice> {
        if (!date) date = new Date()
        const value: JoinLeaveVoice = {uuid, guildId, channelId, userId, before: date}
        if (before) Object.assign(value, {before, after: date})
        return this.collection.set(uuid, value)
    }
    join(guildId: GuildId, channelId: ChannelId, userId: UserId): Collection<string, JoinLeaveVoice> {
        this.deleteKey(guildId, channelId, userId)
        return this.set(randomUUID(), guildId, channelId, userId)
    }
    leave(guildId: GuildId, channelId: ChannelId, userId: UserId): Collection<string, JoinLeaveVoice> {
        const value = this.collection.find(i =>
            i.guildId === guildId && i.channelId === channelId && i.userId === userId && !i.after)
        if (value) {
            this.deleteKey(guildId, channelId, userId)
            return this.set(value.uuid, value.guildId, value.channelId, value.userId, value.before)
        }
    }
    updateJoinLeaveAll(client: Client, date: Date): Promise<Collection<string, JoinLeaveVoice>[]> {
        return Promise.all(client.guilds.cache.map(async (guild: Guild) => {
            const voiceStates = guild.voiceStates.cache
                .filter((voiceState: VoiceState) => voiceState.channelId)
            if (!voiceStates.size) return;
            const activityManager = await SettingsActivityManager.getOne(guild.id)
            const filter = new ActivityFilter(activityManager)
            const states = voiceStates
                .filter((voiceState: VoiceState) => filter.runVoice(voiceState))
            const users = states.map((voiceState: VoiceState) => voiceState.id)
            const values = this.collection.filter(i =>
                i.guildId === guild.id && users.includes(i.userId) && !i.after)
            const uniqueIds: UserId[] = [...new Set(this.collection.map(i => i.userId))]
            this.leaveJoin(values, date)
            states.filter(i => !uniqueIds.includes(i.id))
                .map(i => this.join(guild.id, i.channelId, i.id))
            return values
        }))
    }
    leaveJoinAll(): Promise<VoiceModel[]> {
        const values = this.collection.filter(i => i.after)
        const dto: VoiceDto[] = values.map((i, uuid) => {
            const {guildId, channelId, userId, before, after} = i
            this.collection.delete(uuid)
            return {guildId, channelId, userId, before, after}
        })
        return VoiceManager.createMany(dto)
    }
}

export const VoiceJoinLeaveService = new _VoiceJoinLeaveService(collection)