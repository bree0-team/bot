import {Collection} from 'discord.js'
import {GuildId} from '../../../../../types/base.type.js'
import {BaseSettingsManager} from '../../../managers/base-settings.manager.js'
import {CreateOrUpdateSettingsClanManageDto} from '../dto/create-or-update-settings-clan-manage.dto.js'
import {defaultRoles} from '../constants/defaults.js'
import {SettingsClanManageModel} from '../models/settings-clan-manage.model.js'

const collection = new Collection<GuildId, SettingsClanManageModel>()

class SettingsClanManageManager extends BaseSettingsManager<GuildId, SettingsClanManageModel> {
    createOrUpdate(
        guildId: GuildId,
        dto: CreateOrUpdateSettingsClanManageDto
    ): Promise<SettingsClanManageModel> {
        const guild = this.findOne(guildId)

        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsClanManageDto = {
            roles: defaultRoles,
        }
        return super.$createOrUpdate(guild,
            {guildId, ...defaultDto, ...dto},
            {guildId, ...dto})
    }
}

export default new SettingsClanManageManager(collection, SettingsClanManageModel, 'guildId')