import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {QA_DELETE} from '../../enums/CustomIds.enum.js'
import {QaData} from '../../types/data.type.js'
import {Delete} from '../Delete.js'

class DeleteInteraction extends PrivateHandler {
    protected run({interaction, data}: ButtonHandlerOptions<QaData>) {
        const {messageId} = data
        return new Delete(interaction).run(messageId)
    }
}

export default new DeleteInteraction(QA_DELETE)