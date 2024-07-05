import {Client, VoiceState} from 'discord.js'
import {VoiceStateUpdateEventBuilder} from '../../../builders/event.js'
import SettingsXpManager from '../../settings/xp/managers/settings-xp.manager.js'
import {XpFilter} from '../helpers/xpFilter.js'
import {xpRewardRole} from '../helpers/xpRewardRole.js'
import {XpJoinLeaveService} from '../services/xp-join-leave.service.js'

class VoiceActivityEvent extends VoiceStateUpdateEventBuilder {
    async process(client: Client, oldState: VoiceState, newState: VoiceState) {
        const {guild, member} = (oldState ?? newState)
        if (member.user.bot) return;
        const xpManager = await SettingsXpManager.getOne(guild.id)
        const filter = new XpFilter(xpManager)
        await XpJoinLeaveService.leave(guild.id, member.id)
        if (!filter.states(guild, newState) || !newState.channel) return;
        if (!filter.channelsRoles(member, newState.channelId)) return;
        XpJoinLeaveService.join(guild.id, member.id)
        return xpRewardRole(guild.id, member)
    }
}

export default new VoiceActivityEvent()