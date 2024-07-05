import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {defaultValue} from '../constants/defaults.js'
import {INTERACTION_RESET} from '../enums/CustomIds.enum.js'
import {Interaction} from '../Interaction.js'
import SettingsInteractionManager from '../managers/settings-interaction.manager.js'

class ResetInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await SettingsInteractionManager.createOrUpdate(interaction.guildId, defaultValue)
        return new Interaction(interaction).run()
    }
}

export default new ResetInteraction(INTERACTION_RESET)