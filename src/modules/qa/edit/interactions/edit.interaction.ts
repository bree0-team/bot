import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {QaStatus} from '../../enums/QaStatus.enum.js'
import QaManager from '../../managers/qa.manager.js'
import {Edit} from '../Edit.js'
import {QA_EDIT_MODAL, QA_EDIT_MODAL_DESCRIPTION, QA_EDIT_MODAL_TITLE} from '../enums/CustomIds.enum.js'
import {QaItemData} from '../types/data.type.js'

class EditInteraction extends PrivateHandler {
    protected runFields({interaction, fields, data}: ModalHandlerOptions<QaItemData>) {
        const {itemId} = data
        const item = QaManager.findOne(itemId)
        let title: string | undefined = undefined
        if (item.status === QaStatus.WRITE) title = fields.getTextInputValue(QA_EDIT_MODAL_TITLE) || undefined
        const description = fields.getTextInputValue(QA_EDIT_MODAL_DESCRIPTION)
        return new Edit(interaction).run(itemId, description, title)
    }
}

export default new EditInteraction(QA_EDIT_MODAL)