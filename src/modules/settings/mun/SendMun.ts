import {TextChannel} from 'discord.js'
import {BaseStructure} from '../../../structures/base.js'
import {Write} from '../../mun/Write.js'
import {SettingsMunMissingChannelError} from './errors/mun.error.js'
import SettingsMunManager from './managers/settings-mun.manager.js'
import {Mun} from './Mun.js'

export class SendMun extends BaseStructure {
    async run() {
        const {channelId, title, description} = await SettingsMunManager.getOne(this.guildId)
        const channel = this.getGuildChannel(channelId) as TextChannel
        if (!channel) {
            await new Mun(this.i).run()
            throw new SettingsMunMissingChannelError(this.i)
        }
        return new Write(this.i).send(channel, title, description)
    }
}