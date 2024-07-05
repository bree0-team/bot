import {Client} from 'discord.js'
import {Logger, Logs} from '../../services/logger.js'
import {SelectService} from '../../builders/select.js'
import {ClientReadyEventBuilder} from '../../builders/event.js'
import {setManagers} from './helpers/setManagers.js'

class ClientReadyEvent extends ClientReadyEventBuilder {
    async process(client: Client) {
        Logger.info(
            Logs.info.clientLogin
                .replaceAll('{USER_TAG}', client.user.tag)
        )
        //client.user.setActivity('/help', { type: ActivityType.Watching });
        await SelectService.setAll()
        await setManagers()

        Logger.info(Logs.info.clientReady)
    }
}

export default new ClientReadyEvent(true)