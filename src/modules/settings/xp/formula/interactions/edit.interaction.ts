import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {FORMULA_GIVE_MODAL, FORMULA_GIVE_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {Formula} from '../Formula.js'

class EditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const formula = fields.getTextInputValue(FORMULA_GIVE_MODAL_VALUE)
        await SettingsXpManager.createOrUpdate(interaction.guildId, {formula})
        return new Formula(interaction).run()
    }
}

export default new EditInteraction(FORMULA_GIVE_MODAL)