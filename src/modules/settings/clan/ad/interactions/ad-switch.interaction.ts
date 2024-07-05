import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {Ad} from '../Ad.js'
import {AD_SWITCH} from '../enums/CustomIds.enum.js'
import SettingsClanAdManager from '../managers/settings-clan-ad.manager.js'

class AdSwitchInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const transferManager = await SettingsClanAdManager.getOne(interaction.guildId)
        await SettingsClanAdManager.createOrUpdate(interaction.guildId, {value: !transferManager.value})
        return new Ad(interaction).run()
    }
}

export default new AdSwitchInteraction(AD_SWITCH)