import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {Ad} from '../Ad.js'
import {defaultCooldown} from '../constants/defaults.js'
import {AD_COOLDOWN_RESET} from '../enums/CustomIds.enum.js'
import SettingsClanAdManager from '../managers/settings-clan-ad.manager.js'

class AdResetInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await SettingsClanAdManager.createOrUpdate(interaction.guildId, {cooldown: defaultCooldown})
        return new Ad(interaction).run()
    }
}

export default new AdResetInteraction(AD_COOLDOWN_RESET)