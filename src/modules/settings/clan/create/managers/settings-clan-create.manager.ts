import {Collection} from 'discord.js'
import {GuildId} from '../../../../../types/base.type.js'
import {BaseSettingsManager} from '../../../managers/base-settings.manager.js'
import {CreateOrUpdateSettingsClanCreateDto} from '../dto/create-or-update-settings-clan-create.dto.js'
import {defaultRoles} from '../constants/defaults.js'
import {SettingsClanCreateModel} from '../models/settings-clan-create.model.js'

const collection = new Collection<GuildId, SettingsClanCreateModel>()

class SettingsClanCreateManager extends BaseSettingsManager<GuildId, SettingsClanCreateModel> {
    createOrUpdate(
        guildId: GuildId,
        dto: CreateOrUpdateSettingsClanCreateDto
    ): Promise<SettingsClanCreateModel> {
        const guild = this.findOne(guildId)

        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsClanCreateDto = {
            roles: defaultRoles,
        }
        return super.$createOrUpdate(guild,
            {guildId, ...defaultDto, ...dto},
            {guildId, ...dto})
    }
}

export default new SettingsClanCreateManager(collection, SettingsClanCreateModel, 'guildId')