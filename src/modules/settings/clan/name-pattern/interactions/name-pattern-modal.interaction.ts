import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsClanManager from '../../managers/settings-clan.manager.js'
import {NAME_PATTERN_MODAL, NAME_PATTERN_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {NamePattern} from '../NamePattern.js'

class NamePatternModalInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const value = fields.getTextInputValue(NAME_PATTERN_MODAL_VALUE)
        const npManager = await SettingsClanManager.getOne(interaction.guildId)
        const oldNamePattern = npManager.name_pattern
        await SettingsClanManager.createOrUpdate(interaction.guildId, {name_pattern: value})
        const np = new NamePattern(interaction)
        np.change_channel_name(oldNamePattern)
        return np.run()
    }
}

export default new NamePatternModalInteraction(NAME_PATTERN_MODAL)