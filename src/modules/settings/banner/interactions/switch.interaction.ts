import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {Banner} from '../Banner.js'
import {BANNER_SWITCH} from '../enums/CustomIds.enum.js'
import SettingsBannerManager from '../managers/settings-banner.manager.js'

class SwitchInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const bannerManager = await SettingsBannerManager.getOne(interaction.guildId)
        await SettingsBannerManager.createOrUpdate(interaction.guildId, {enabled: !bannerManager.enabled})
        return new Banner(interaction).run()
    }
}

export default new SwitchInteraction(BANNER_SWITCH)