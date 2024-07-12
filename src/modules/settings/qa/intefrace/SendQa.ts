import {TextChannel} from 'discord.js'
import {UnknownChannelError} from '../../../../errors/notfound.js'
import {BaseStructure} from '../../../../structures/base.js'
import {ChannelId} from '../../../../types/base.type.js'
import {Write} from '../../../qa/write/Write.js'
import SettingsQaManager from '../managers/settings-qa.manager.js'
import {Qa} from '../Qa.js'

export class SendQa extends BaseStructure {
    async run(channelId: ChannelId) {
        const {title, description} = SettingsQaManager.findOne(this.guildId, channelId)
        const channel = this.getGuildChannel(channelId) as TextChannel
        if (!channel) {
            await new Qa(this.i).run()
            throw new UnknownChannelError(this.i)
        }
        return new Write(this.i).send(channel, title, description)
    }
}