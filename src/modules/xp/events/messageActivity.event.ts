import {Client, Message} from 'discord.js'
import {MessageCreateEventBuilder} from '../../../builders/event.js'
import SettingsXpManager from '../../settings/xp/managers/settings-xp.manager.js'
import {XpFilter} from '../helpers/xpFilter.js'
import {xpRewardRole} from '../helpers/xpRewardRole.js'
import {XpSendService} from '../services/xp-send.service.js'

class MessageActivityEvent extends MessageCreateEventBuilder {
    async process(client: Client, message: Message) {
        const {
            author,
            member,
            id,
            guildId,
            channelId
        } = message
        if (!member || author.bot) return;
        const xpManager = await SettingsXpManager.getOne(guildId)
        const filter = new XpFilter(xpManager)
        if (!filter.channelsRoles(member, channelId)) return;
        XpSendService.set(id, guildId, member.id)
        return xpRewardRole(guildId, member)
    }
}

export default new MessageActivityEvent()