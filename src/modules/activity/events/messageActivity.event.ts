import {Client, Message} from 'discord.js'
import {MessageCreateEventBuilder} from '../../../builders/event.js'
import SettingsActivityManager from '../../settings/activity/managers/settings-activity.manager.js'
import {ActivityFilter} from '../helpers/activityFilter.js'
import {MessageSendService} from '../services/message-send.service.js'

class MessageActivityEvent extends MessageCreateEventBuilder {
    async process(client: Client, message: Message) {
        const {
            member,
            id,
            guildId,
            channelId,
            createdAt
        } = message
        if (!member) return;
        const activityManager = await SettingsActivityManager.getOne(guildId)
        const filter = new ActivityFilter(activityManager)
        if (!filter.types(member.user)) return;
        if (!filter.channelsRoles(member, channelId)) return;
        MessageSendService.set(id, guildId, channelId, member.id, createdAt)
    }
}

export default new MessageActivityEvent()