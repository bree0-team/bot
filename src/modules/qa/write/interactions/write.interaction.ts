import {ModalHandlerOptions, PublicHandler} from '../../../../handlers/interaction.js'
import {QA_WRITE_MODAL, QA_WRITE_MODAL_DESCRIPTION, QA_WRITE_MODAL_TITLE} from '../enums/CustomIds.enum.js'
import {Write} from '../Write.js'

class WriteInteraction extends PublicHandler {
    protected runFields({interaction, fields}: ModalHandlerOptions) {
        const title = fields.getTextInputValue(QA_WRITE_MODAL_TITLE)
        const description = fields.getTextInputValue(QA_WRITE_MODAL_DESCRIPTION)
        return new Write(interaction).run(title, description)
    }
}

export default new WriteInteraction(QA_WRITE_MODAL)