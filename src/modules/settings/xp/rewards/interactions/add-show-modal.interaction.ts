import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import {REWARD_ADD_ROLE, REWARD_ADD_ROLE_MODAL, REWARD_ADD_ROLE_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class AddShowModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        return Modal(interaction, REWARD_ADD_ROLE_MODAL,
            interaction.t('add'), [
                new TextInputBuilder({
                    customId: REWARD_ADD_ROLE_MODAL_VALUE,
                    style: TextInputStyle.Short,
                    label: interaction.t('level'),
                    minLength: 1, maxLength: 3
                })
            ]
        )
    }
}

export default new AddShowModalInteraction(REWARD_ADD_ROLE)