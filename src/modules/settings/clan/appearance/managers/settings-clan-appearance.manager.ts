import {Collection} from 'discord.js'
import {GuildId} from '../../../../../types/base.type.js'
import {BaseSettingsManagerWithCreate} from '../../../managers/base-settings.manager.js'
import {CreateOrUpdateSettingsClanAppearanceDto} from '../dto/create-or-update-settings-clan-appearance.dto.js'
import {SettingsClanAppearanceModel} from '../models/settings-clan-appearance.model.js'

const collection = new Collection<GuildId, SettingsClanAppearanceModel>()

class SettingsClanAppearanceManager extends BaseSettingsManagerWithCreate<
    GuildId, SettingsClanAppearanceModel, CreateOrUpdateSettingsClanAppearanceDto
> {}

export default new SettingsClanAppearanceManager(collection, SettingsClanAppearanceModel, 'guildId')