import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {defaultNamePattern} from '../../constants/defaults.js'
import SettingsClanManager from '../../managers/settings-clan.manager.js'
import {NAME_PATTERN_RESET} from '../enums/CustomIds.enum.js'
import {NamePattern} from '../NamePattern.js'

class LimitReset extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const npManager = await SettingsClanManager.getOne(interaction.guildId)
        const oldNamePattern = npManager.name_pattern
        await SettingsClanManager.createOrUpdate(interaction.guildId, {name_pattern: defaultNamePattern})
        const np = new NamePattern(interaction)
        np.change_channel_name(oldNamePattern)
        return np.run()
    }
}

export default new LimitReset(NAME_PATTERN_RESET)