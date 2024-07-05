import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {defaultTextGive} from '../../constants/defaults.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {TEXT_GIVE_RESET} from '../enums/CustomIds.enum.js'
import {GiveText} from '../GiveText.js'

class ResetInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await SettingsXpManager.createOrUpdate(interaction.guildId, {textGive: defaultTextGive})
        return new GiveText(interaction).run()
    }
}

export default new ResetInteraction(TEXT_GIVE_RESET)