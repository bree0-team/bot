import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../handlers/interaction.js'
import {Modal} from '../../../services/interaction.js'
import {MUN_ASSIGN, MUN_ASSIGN_MODAL, MUN_ASSIGN_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import MunManager from '../managers/mun.manager.js'
import {Mun} from '../Mun.js'

class AssignModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await new Mun(interaction).access()
        const munManager = MunManager.findOne(interaction.message.id)
        return Modal(interaction, MUN_ASSIGN_MODAL, interaction.t('mun:assign_modal'), [
            new TextInputBuilder({
                customId: MUN_ASSIGN_MODAL_VALUE,
                style: TextInputStyle.Short,
                label: interaction.t('nickname'),
                value: munManager.newValue,
                minLength: 1, maxLength: 32
            })
        ])
    }
}

export default new AssignModalInteraction(MUN_ASSIGN, false)