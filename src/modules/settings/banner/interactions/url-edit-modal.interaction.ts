import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {URL_EDIT, URL_MODAL, URL_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import SettingsBannerManager from '../managers/settings-banner.manager.js'

class UrlEditModalInteraction extends ModalHandler {
    protected run({interaction}: ButtonHandlerOptions) {
        const item = SettingsBannerManager.findOne(interaction.guildId)
        const urlInput = new TextInputBuilder({
            customId: URL_MODAL_VALUE,
            style: TextInputStyle.Short,
            label: interaction.t('settings:banner:background')
        })
        if (item) urlInput.setValue(item.url)
        return Modal(interaction, URL_MODAL, interaction.t('modal:title'), [urlInput])
    }
}

export default new UrlEditModalInteraction(URL_EDIT)