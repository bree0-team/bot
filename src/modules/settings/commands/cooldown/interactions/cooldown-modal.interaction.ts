import _ from 'lodash'
import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {SettingsMinCooldownError} from '../../../errors/settings.error.js'
import {defaultMinCooldown} from '../../constants/defaults.js'
import SettingsCommandsManager from '../../managers/settings-commands.manager.js'
import {CommandData} from '../../types/data.type.js'
import {Cooldown} from '../Cooldown.js'
import {COOLDOWN_EDIT_MODAL, COOLDOWN_EDIT_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class CooldownModalInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<CommandData>) {
        const value = fields.getTextInputValue(COOLDOWN_EDIT_MODAL_VALUE)
        const cooldown = _.toLength(value) as number
        if (cooldown < defaultMinCooldown) throw new SettingsMinCooldownError(interaction, defaultMinCooldown)
        const {command} = data
        await SettingsCommandsManager.createOrUpdate(interaction.guildId, command, {cooldown})
        return new Cooldown(interaction).run(command)
    }
}

export default new CooldownModalInteraction(COOLDOWN_EDIT_MODAL)