import {Collection} from 'discord.js'
import {GuildId} from '../../../../types/base.type.js'
import {BaseSettingsManagerWithCreate} from '../../managers/base-settings.manager.js'
import {CreateOrUpdateSettingsBannerDto} from '../dto/create-or-update-settings-banner.dto.js'
import {SettingsBannerModel} from '../models/settings-banner.model.js'

const collection = new Collection<GuildId, SettingsBannerModel>()

class SettingsBannerManager extends BaseSettingsManagerWithCreate<
    GuildId, SettingsBannerModel, CreateOrUpdateSettingsBannerDto
> {}

export default new SettingsBannerManager(collection, SettingsBannerModel, 'guildId')