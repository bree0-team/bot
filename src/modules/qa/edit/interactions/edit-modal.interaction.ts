import {ModalHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {QA_EDIT_SELECT} from '../enums/CustomIds.enum.js'
import {ModalEdit} from '../ModalEdit.js'

class EditModalInteraction extends ModalHandler {
    protected runValue = ({interaction, value}: SelectOneValueHandlerOptions) =>
        new ModalEdit(interaction).run(Number(value))
}

export default new EditModalInteraction(QA_EDIT_SELECT)