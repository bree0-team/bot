import {randomUUID} from 'crypto'
import {Client, Collection, Guild, VoiceState} from 'discord.js'
import {GuildId, UserId} from '../../../types/base.type.js'
import SettingsXpManager from '../../settings/xp/managers/settings-xp.manager.js'
import {XpDto} from '../dto/xp.dto.js'
import {XpFilter} from '../helpers/xpFilter.js'
import {xpRange} from '../helpers/xpRange.js'
import XpManager from '../managers/xp.manager.js'
import {XpModel} from '../models/xp.model.js'

interface JoinLeaveVoice {
    uuid: string
    guildId: GuildId
    userId: UserId
    before: Date
    after?: Date
}

const collection = new Collection<string, JoinLeaveVoice>()

class _XpJoinLeaveService {
    constructor(private readonly collection: Collection<string, JoinLeaveVoice>) {}
    private deleteKey(guildId: GuildId, userId: UserId): boolean {
        const value = this.collection.findKey(i =>
            i.guildId === guildId && i.userId === userId && !i.after)
        return this.collection.delete(value)
    }
    private leaveJoin(collection: Collection<string, JoinLeaveVoice>, date: Date): void {
        collection.map((i, uuid) => {
            this.deleteKey(i.guildId, i.userId)
            this.set(uuid, i.guildId, i.userId, i.before, date)
            return this.join(i.guildId, i.userId)
        })
    }
    private set(
        uuid: string,
        guildId: GuildId,
        userId: UserId,
        before?: Date,
        date?: Date
    ): Collection<string, JoinLeaveVoice> {
        if (!date) date = new Date()
        const value: JoinLeaveVoice = {uuid, guildId, userId, before: date}
        if (before) Object.assign(value, {before, after: date})
        return this.collection.set(uuid, value)
    }
    join(guildId: GuildId, userId: UserId): Collection<string, JoinLeaveVoice> {
        this.deleteKey(guildId, userId)
        return this.set(randomUUID(), guildId, userId)
    }
    leave(guildId: GuildId, userId: UserId): Collection<string, JoinLeaveVoice> {
        const value = this.collection.find(i =>
            i.guildId === guildId && i.userId === userId && !i.after)
        if (value) {
            this.deleteKey(guildId, userId)
            return this.set(value.uuid, value.guildId, value.userId, value.before)
        }
    }
    updateJoinLeaveAll(client: Client, date: Date): Promise<Collection<string, JoinLeaveVoice>[]> {
        return Promise.all(client.guilds.cache.map(async (guild: Guild) => {
            const voiceStates = guild.voiceStates.cache
                .filter((voiceState: VoiceState) => voiceState.channelId)
            if (!voiceStates.size) return;
            const xpManager = await SettingsXpManager.getOne(guild.id)
            const filter = new XpFilter(xpManager)
            const states = voiceStates
                .filter((voiceState: VoiceState) => filter.runVoice(voiceState))
            const users = states.map((voiceState: VoiceState) => voiceState.id)
            const values = this.collection.filter(i =>
                i.guildId === guild.id && users.includes(i.userId) && !i.after)
            const uniqueIds: UserId[] = [...new Set(this.collection.map(i => i.userId))]
            this.leaveJoin(values, date)
            states.filter(i => !uniqueIds.includes(i.id))
                .map(i => this.join(guild.id, i.id))
            return values
        }))
    }
    async leaveJoinAll(): Promise<XpModel[]> {
        const values = this.collection.filter(i => i.after)
        const sumValues: Record<string, number> = values.reduce((acc, {
            guildId, userId, before, after
        }, uuid) => {
            this.collection.delete(uuid)
            const key = guildId + '-' + userId
            const value = after.getTime() - before.getTime()
            acc[key] = (acc[key] || 0) + value
            return acc
        }, {})
        const dto: XpDto[] = await Promise.all(Object.entries(sumValues)
            .map(async ([key, value]) => {
            const [guildId, userId] = key.split('-')
            const {voiceGive} = await SettingsXpManager.getOne(guildId)
            const [from, to] = voiceGive
            const item = XpManager.findOne(guildId, userId)
            const xp = xpRange(from, to)
            return {id: item?.id, guildId, userId, value: (item?.value || 0)+(xp*value/1000/60), level: 0}
        }))
        return XpManager.createMany(dto, ['value'])
    }
}

export const XpJoinLeaveService = new _XpJoinLeaveService(collection)