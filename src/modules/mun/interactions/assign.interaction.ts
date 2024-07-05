import {ModalHandlerOptions, PublicHandler} from '../../../handlers/interaction.js'
import {MUN_ASSIGN_MODAL, MUN_ASSIGN_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {MunStatus} from '../enums/MunStatus.enum.js'
import {Mun} from '../Mun.js'

class AssignInteraction extends PublicHandler {
    protected runFields({interaction, fields}: ModalHandlerOptions) {
        const value = fields.getTextInputValue(MUN_ASSIGN_MODAL_VALUE)
        return new Mun(interaction).run(MunStatus.ASSIGN, value)
    }
}

export default new AssignInteraction(MUN_ASSIGN_MODAL)