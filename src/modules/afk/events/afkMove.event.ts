import {Client, Guild, GuildMember, VoiceState} from 'discord.js'
import _ from 'lodash'
import {VoiceStateUpdateEventBuilder} from '../../../builders/event.js'
import {ChannelId, RoleId, UserId} from '../../../types/base.type.js'
import SettingsAfkManager from '../../settings/afk/managers/settings-afk.manager.js'

class AfkMoveEvent extends VoiceStateUpdateEventBuilder {
    moveToAfk(member: GuildMember, sleep: number, channels: ChannelId[]): NodeJS.Timeout {
        return setTimeout(() => {
            const {guild, voice} = member
            if (voice && voice.selfDeaf && channels.includes(voice.channelId)) {
                if (guild.afkChannelId === voice.channelId) return;
                member.edit({channel: guild.afkChannel})
            }
        }, sleep * 1000)
    }
    getRoles(guild: Guild, roles: RoleId[]): UserId[] {
        const members = roles
            .map(roleId => guild.roles.resolve(roleId))
            .filter(role => !role)
            .map(role => role.members.map(i => i))
        const uniqMembers = _.uniq([].concat(...members)) as GuildMember[]
        return uniqMembers.map(member => member.id)
    }
    async process(_: Client, oldState: VoiceState, newState: VoiceState) {
        const {guild, member} = (oldState ?? newState)
        const afkManager= await SettingsAfkManager.getOne(guild.id)
        if (!afkManager.value) return;
        if ((oldState.selfDeaf || newState.selfDeaf) && afkManager.channels.includes(newState.channelId))
            if (!this.getRoles(guild, afkManager.roles).includes(member.id))
                return this.moveToAfk(member, afkManager.sleep, afkManager.channels)
    }
}

export default new AfkMoveEvent()