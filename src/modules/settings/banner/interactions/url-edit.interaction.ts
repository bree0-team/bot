import {ValidUrlError} from '../../../../errors/servererror.js'
import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {UrlUtils} from '../../../../utils/url.js'
import {Banner} from '../Banner.js'
import {URL_MODAL, URL_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import SettingsBannerManager from '../managers/settings-banner.manager.js'

class UrlEditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const url = fields.getTextInputValue(URL_MODAL_VALUE)
        const validUrl = UrlUtils.isValidHttpUrl(url)
        if (!validUrl) throw new ValidUrlError(interaction)
        await SettingsBannerManager.createOrUpdate(interaction.guildId, {url})
        return new Banner(interaction).run()
    }
}

export default new UrlEditInteraction(URL_MODAL)