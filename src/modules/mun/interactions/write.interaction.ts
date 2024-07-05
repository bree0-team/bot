import {ModalHandlerOptions, PublicHandler} from '../../../handlers/interaction.js'
import {MUN_WRITE_MODAL, MUN_WRITE_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {Write} from '../Write.js'

class WriteInteraction extends PublicHandler {
    protected runFields({interaction, fields}: ModalHandlerOptions) {
        const value = fields.getTextInputValue(MUN_WRITE_MODAL_VALUE)
        return new Write(interaction).run(value)
    }
}

export default new WriteInteraction(MUN_WRITE_MODAL)