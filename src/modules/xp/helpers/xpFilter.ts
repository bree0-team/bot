import {Guild, GuildMember, VoiceState} from 'discord.js'
import _ from 'lodash'
import {ChannelId, RoleId} from '../../../types/base.type.js'
import {VoiceStates} from '../../settings/enums/VoiceStates.enum.js'
import {SettingsXpModel} from '../../settings/xp/models/settings-xp.model.js'

export class XpFilter {
    private readonly voiceStates: VoiceStates[]
    private readonly channels: ChannelId[]
    private readonly roles: RoleId[]
    constructor(private readonly xpManager: SettingsXpModel) {
        const {
            voiceStates,
            channels,
            roles
        } = xpManager
        this.voiceStates = voiceStates
        this.channels = channels
        this.roles = roles
    }
    states(guild: Guild, voiceState: VoiceState): boolean {
        let bool: boolean = false
        const selfMute: boolean = this.voiceStates.includes(VoiceStates.SelfMute) && voiceState.selfMute
        const selfDeaf: boolean = this.voiceStates.includes(VoiceStates.SelfDeaf) && voiceState.selfDeaf
        const serverMute: boolean = this.voiceStates.includes(VoiceStates.ServerMute) && voiceState.serverMute
        const serverDeaf: boolean = this.voiceStates.includes(VoiceStates.ServerDeaf) && voiceState.serverDeaf
        const afk: boolean = this.voiceStates.includes(VoiceStates.Afk) &&
            _.every([guild.afkChannelId, guild.afkChannelId === voiceState.channelId], Boolean)
        const normal: boolean = this.voiceStates.includes(VoiceStates.Normal) && (
            !voiceState.selfMute &&
            !voiceState.selfDeaf &&
            !voiceState.serverMute &&
            !voiceState.serverDeaf &&
            guild.afkChannelId !== voiceState.channelId
        )
        if (selfMute || selfDeaf || serverMute || serverDeaf || afk || normal) bool = true
        return bool
    }
    channelsRoles(member: GuildMember, channelId: ChannelId): boolean {
        const memberRoles: RoleId[] = member.roles.cache.map(role => role.id)
        const disabledRoles = _.intersection(this.roles, memberRoles) as RoleId[]
        return !disabledRoles.length && !this.channels.includes(channelId);
    }
    runVoice(voiceState: VoiceState): boolean {
        const {guild, member, channelId} = voiceState
        if (!this.states(guild, voiceState) || !voiceState.channel) return false
        return this.channelsRoles(member, channelId)
    }
}