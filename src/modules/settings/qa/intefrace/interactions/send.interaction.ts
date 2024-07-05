import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {QaData} from '../../types/data.type.js'
import {QA_SEND} from '../enums/CustomIds.enum.js'
import {SendQa} from '../SendQa.js'

class SendInteraction extends PrivateHandler {
    protected run({interaction, data}: ButtonHandlerOptions<QaData>) {
        const {channelId} = data
        return new SendQa(interaction).run(channelId)
    }
}

export default new SendInteraction(QA_SEND)