import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {CLAN_AD_CREATE, CLAN_AD_CREATE_MODAL, CLAN_AD_CREATE_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class CreateModalInteraction extends ModalHandler {
    protected run({interaction}: ButtonHandlerOptions) {
        return Modal(interaction, CLAN_AD_CREATE_MODAL,
            interaction.t('clan:ad:modal:title'), [
                new TextInputBuilder({
                    customId: CLAN_AD_CREATE_MODAL_VALUE,
                    label: interaction.t('name'),
                    style: TextInputStyle.Short,
                    minLength: 0, maxLength: 100,
                })
            ]
        )
    }
}

export default new CreateModalInteraction(CLAN_AD_CREATE)