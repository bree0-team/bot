import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {FORMULA_GIVE, FORMULA_GIVE_MODAL, FORMULA_GIVE_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class ShowModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const {formula} = await SettingsXpManager.getOne(interaction.guildId)
        return Modal(interaction, FORMULA_GIVE_MODAL,
            interaction.t('settings:xp:formula:description'), [
                new TextInputBuilder({
                    customId: FORMULA_GIVE_MODAL_VALUE,
                    style: TextInputStyle.Short,
                    label: interaction.t('settings:xp:formula:label'),
                    value: formula.toString(),
                    minLength: 1, maxLength: 100
                })
            ]
        )
    }
}

export default new ShowModalInteraction(FORMULA_GIVE)