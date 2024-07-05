import {Client} from 'discord.js'
import {CrontabBuilder} from '../../../builders/crontab.js'
import {VoiceJoinLeaveService} from '../services/voice-join-leave.service.js'

class VoiceUpdateCrontab extends CrontabBuilder {
    async run(client: Client) {
        await VoiceJoinLeaveService.updateJoinLeaveAll(client, new Date())
        return VoiceJoinLeaveService.leaveJoinAll()
    }
}

export default new VoiceUpdateCrontab('* * * * *')