import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import {
    AD_COOLDOWN_EDIT,
    AD_COOLDOWN_MODAL,
    AD_COOLDOWN_MODAL_VALUE
} from '../enums/CustomIds.enum.js'
import SettingsClanAdManager from '../managers/settings-clan-ad.manager.js'

class AdModalInteraction extends ModalHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const adManager = await SettingsClanAdManager.getOne(interaction.guildId)
        return Modal(interaction, AD_COOLDOWN_MODAL,
            interaction.t('settings:clan:ad:modal:title'), [
                new TextInputBuilder({
                    customId: AD_COOLDOWN_MODAL_VALUE,
                    label: interaction.t('cooldown'),
                    value: adManager.cooldown.toString(),
                    style: TextInputStyle.Short,
                    minLength: 1, maxLength: 4,
                }),
            ]
        )
    }
}

export default new AdModalInteraction(AD_COOLDOWN_EDIT)