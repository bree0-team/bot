import {TextChannel} from 'discord.js'
import {BaseStructure} from '../../../../structures/base.js'
import {ChannelId} from '../../../../types/base.type.js'
import {Write} from '../../../qa/write/Write.js'
import SettingsQaManager from '../managers/settings-qa.manager.js'

export class SendQa extends BaseStructure {
    async run(channelId: ChannelId) {
        const {title, description} = SettingsQaManager.findOne(this.guildId, channelId)
        const channel = this.getGuildChannel(channelId) as TextChannel
        return new Write(this.i).send(channel, title, description)
    }
}