import {Collection} from 'discord.js'
import {GuildId} from '../../../../types/base.type.js'
import {BaseSettingsManager} from '../../managers/base-settings.manager.js'
import {CreateOrUpdateSettingsMunDto} from '../dto/create-or-update-settings-mun.dto.js'
import {defaultRoles} from '../constants/defaults.js'
import {SettingsMunModel} from '../models/settings-mun.model.js'

const collection = new Collection<GuildId, SettingsMunModel>()

class SettingsMunManager extends BaseSettingsManager<GuildId, SettingsMunModel> {
    createOrUpdate(guildId: GuildId, dto: CreateOrUpdateSettingsMunDto): Promise<SettingsMunModel> {
        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsMunDto = {
            roles: defaultRoles
        }
        return super.$createOrUpdate(this.findOne(guildId),
            {guildId, ...defaultDto, ...dto},
            {guildId, ...dto})
    }
}

export default new SettingsMunManager(collection, SettingsMunModel, 'guildId')