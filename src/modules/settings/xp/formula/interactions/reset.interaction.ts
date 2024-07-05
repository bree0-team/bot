import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {defaultFormula} from '../../constants/defaults.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {FORMULA_GIVE_RESET} from '../enums/CustomIds.enum.js'
import {Formula} from '../Formula.js'

class ResetInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await SettingsXpManager.createOrUpdate(interaction.guildId, {formula: defaultFormula})
        return new Formula(interaction).run()
    }
}

export default new ResetInteraction(FORMULA_GIVE_RESET)