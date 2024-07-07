import {Guild, GuildMember, User, VoiceState} from 'discord.js'
import _ from 'lodash'
import {ChannelId, RoleId} from '../../../types/base.type.js'
import {MemberType} from '../../settings/activity/enums/MemberType.enum.js'
import {VoiceStates} from '../../settings/enums/VoiceStates.enum.js'
import {SettingsActivityModel} from '../../settings/activity/models/settings-activity.model.js'

export class ActivityFilter {
    private readonly memberTypes: MemberType[]
    private readonly voiceStates: VoiceStates[]
    private readonly channels: ChannelId[]
    private readonly roles: RoleId[]
    constructor(private readonly activityManager: SettingsActivityModel) {
        const {
            memberTypes,
            voiceStates,
            channels,
            roles
        } = activityManager
        this.memberTypes = memberTypes
        this.voiceStates = voiceStates
        this.channels = channels
        this.roles = roles
    }
    types(user: User): boolean {
        if (!this.memberTypes.length) return false
        return !!((this.memberTypes.includes(MemberType.USERS) && !user.bot) ||
            (this.memberTypes.includes(MemberType.BOTS) && user.bot))
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
        if (!this.types(member.user)) return false
        if (!this.states(guild, voiceState) || !voiceState.channel) return false
        return this.channelsRoles(member, channelId)
    }
}