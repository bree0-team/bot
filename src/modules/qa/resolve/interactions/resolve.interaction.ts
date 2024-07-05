import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {QA_RESOLVE} from '../../enums/CustomIds.enum.js'
import {QaData} from '../../types/data.type.js'
import {Resolve} from '../Resolve.js'

class ResolveInteraction extends PrivateHandler {
    protected run({interaction, data}: ButtonHandlerOptions<QaData>) {
        const {messageId} = data
        return new Resolve(interaction).run(messageId)
    }
}

export default new ResolveInteraction(QA_RESOLVE)