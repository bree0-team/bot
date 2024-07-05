import {Client, VoiceState} from 'discord.js'
import {VoiceStateUpdateEventBuilder} from '../../../builders/event.js'
import SettingsActivityManager from '../../settings/activity/managers/settings-activity.manager.js'
import {ActivityFilter} from '../helpers/activityFilter.js'
import {VoiceJoinLeaveService} from '../services/voice-join-leave.service.js'

class VoiceActivityEvent extends VoiceStateUpdateEventBuilder {
    async process(client: Client, oldState: VoiceState, newState: VoiceState) {
        const {guild, member} = (oldState ?? newState)
        const activityManager = await SettingsActivityManager.getOne(guild.id)
        const filter = new ActivityFilter(activityManager)
        if (!filter.types(member)) return;
        await VoiceJoinLeaveService.leave(guild.id, oldState.channelId, member.id)
        if (!filter.states(guild, newState) || !newState.channel) return;
        if (!filter.channelsRoles(member, newState.channelId)) return;
        VoiceJoinLeaveService.join(guild.id, newState.channelId, member.id)
    }
}

export default new VoiceActivityEvent()