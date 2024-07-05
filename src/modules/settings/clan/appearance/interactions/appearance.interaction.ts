import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {Appearance} from '../Appearance.js'
import {CreateOrUpdateSettingsClanAppearanceDto} from '../dto/create-or-update-settings-clan-appearance.dto.js'
import {SETTINGS_CLAN_APPEARANCE} from '../enums/CustomIds.enum.js'
import SettingsClanAppearanceManager from '../managers/settings-clan-appearance.manager.js'

class AppearanceInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values}: SelectManyValuesHandlerOptions<keyof CreateOrUpdateSettingsClanAppearanceDto>
    ) {
        const color = values.includes('color')
        const description = values.includes('description')
        const avatar = values.includes('avatar')
        const banner = values.includes('banner')
        await SettingsClanAppearanceManager.createOrUpdate(interaction.guildId, {color, description, avatar, banner})
        return new Appearance(interaction).run()
    }
}

export default new AppearanceInteraction(SETTINGS_CLAN_APPEARANCE)