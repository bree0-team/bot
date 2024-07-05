import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {QA_EDIT} from '../../enums/CustomIds.enum.js'
import QaManager from '../../managers/qa.manager.js'
import {QaData} from '../../types/data.type.js'
import {BeforeEdit} from '../BeforeEdit.js'
import {ModalEdit} from '../ModalEdit.js'

class EditSelectInteraction extends ModalHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<QaData>) {
        const {messageId} = data
        const qaManager = QaManager.findAllByMessageId(messageId)
            .filter(i => i.userId === interaction.user.id)
        if (qaManager.size > 1) {
            await interaction.deferUpdate()
            return new BeforeEdit(interaction).run(messageId)
        } else {
            const item = qaManager.first()
            return new ModalEdit(interaction).run(item.id)
        }
    }
}

export default new EditSelectInteraction(QA_EDIT)