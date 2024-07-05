import {Collection} from 'discord.js'
import {GuildId} from '../../../../types/base.type.js'
import {BaseSettingsManagerWithCreate} from '../../managers/base-settings.manager.js'
import {CreateOrUpdateSettingsClanDto} from '../dto/create-or-update-settings-clan.dto.js'
import {SettingsClanModel} from '../models/settings-clan.model.js'

const collection = new Collection<GuildId, SettingsClanModel>()

class SettingsClanManager extends BaseSettingsManagerWithCreate<
    GuildId, SettingsClanModel, CreateOrUpdateSettingsClanDto
> {}

export default new SettingsClanManager(collection, SettingsClanModel, 'guildId')