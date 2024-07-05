import _ from 'lodash'
import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {SettingsMinCooldownError} from '../../../errors/settings.error.js'
import {Ad} from '../Ad.js'
import {defaultMinCooldown} from '../constants/defaults.js'
import {AD_COOLDOWN_MODAL, AD_COOLDOWN_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import SettingsClanAdManager from '../managers/settings-clan-ad.manager.js'

class AdEditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const cooldown = fields.getTextInputValue(AD_COOLDOWN_MODAL_VALUE)
        if (_.toLength(cooldown) < defaultMinCooldown)
            throw new SettingsMinCooldownError(interaction, defaultMinCooldown)
        await SettingsClanAdManager.createOrUpdate(interaction.guildId, {cooldown: _.toLength(cooldown)})
        return new Ad(interaction).run()
    }
}

export default new AdEditInteraction(AD_COOLDOWN_MODAL)