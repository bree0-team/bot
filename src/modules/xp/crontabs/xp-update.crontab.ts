import {Client} from 'discord.js'
import {CrontabBuilder} from '../../../builders/crontab.js'
import {XpJoinLeaveService} from '../services/xp-join-leave.service.js'
import {XpSendService} from '../services/xp-send.service.js'

class XpUpdateCrontab extends CrontabBuilder {
    async run(client: Client) {
        await XpSendService.sendsAll()
        await XpJoinLeaveService.updateJoinLeaveAll(client, new Date())
        return XpJoinLeaveService.leaveJoinAll()
    }
}

export default new XpUpdateCrontab('* * * * *')