import {Collection} from 'discord.js'
import {GuildId} from '../../../../../types/base.type.js'
import {BaseSettingsManagerWithCreate} from '../../../managers/base-settings.manager.js'
import {CreateOrUpdateSettingsClanAdDto} from '../dto/create-or-update-settings-clan-ad.dto.js'
import {SettingsClanAdModel} from '../models/settings-clan-ad.model.js'

const collection = new Collection<GuildId, SettingsClanAdModel>()

class SettingsClanAdManager extends BaseSettingsManagerWithCreate<
    GuildId, SettingsClanAdModel, CreateOrUpdateSettingsClanAdDto
> {}

export default new SettingsClanAdManager(collection, SettingsClanAdModel, 'guildId')