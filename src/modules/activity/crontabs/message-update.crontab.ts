import {Client} from 'discord.js'
import {CrontabBuilder} from '../../../builders/crontab.js'
import {MessageSendService} from '../services/message-send.service.js'

class MessageUpdateCrontab extends CrontabBuilder {
    run = (_: Client) => MessageSendService.sendsAll()
}

export default new MessageUpdateCrontab('* * * * *')