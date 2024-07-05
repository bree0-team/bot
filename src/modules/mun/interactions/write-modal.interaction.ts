import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../handlers/interaction.js'
import {Modal} from '../../../services/interaction.js'
import {MUN_WRITE, MUN_WRITE_MODAL, MUN_WRITE_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class WriteModalInteraction extends ModalHandler {
    protected run({interaction}: ButtonHandlerOptions) {
        return Modal(interaction, MUN_WRITE_MODAL, interaction.t('mun:write_modal:title'), [
            new TextInputBuilder({
                customId: MUN_WRITE_MODAL_VALUE,
                style: TextInputStyle.Short,
                label: interaction.t('nickname'),
                placeholder: interaction.t('mun:write_modal:placeholder'),
                minLength: 1, maxLength: 32
            })
        ])
    }
}

export default new WriteModalInteraction(MUN_WRITE, false)