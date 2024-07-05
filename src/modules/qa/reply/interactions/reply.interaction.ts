import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {QaData} from '../../types/data.type.js'
import {QA_REPLY_MODAL, QA_REPLY_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {Reply} from '../Reply.js'

class ReplyInteraction extends PrivateHandler {
    protected runFields({interaction, fields, data}: ModalHandlerOptions<QaData>) {
        const {messageId} = data
        const value = fields.getTextInputValue(QA_REPLY_MODAL_VALUE)
        return new Reply(interaction).run(messageId, value)
    }
}

export default new ReplyInteraction(QA_REPLY_MODAL)