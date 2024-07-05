import {Collection} from 'discord.js'
import {GuildId} from '../../../../types/base.type.js'
import {BaseSettingsManagerWithCreate} from '../../managers/base-settings.manager.js'
import {
    CreateOrUpdateSettingsGeneralDto
} from '../dto/create-or-update-settings-general.dto.js'
import {SettingsGeneralModel} from '../models/settings-general.model.js'

const collection = new Collection<GuildId, SettingsGeneralModel>()

class SettingsGeneralManager extends BaseSettingsManagerWithCreate<
    GuildId, SettingsGeneralModel, CreateOrUpdateSettingsGeneralDto
> {}

export default new SettingsGeneralManager(collection, SettingsGeneralModel, 'guildId')