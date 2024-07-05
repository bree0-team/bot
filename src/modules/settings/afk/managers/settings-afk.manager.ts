import {Collection} from 'discord.js'
import {GuildId} from '../../../../types/base.type.js'
import {BaseSettingsManager} from '../../managers/base-settings.manager.js'
import {CreateOrUpdateSettingsAfkDto} from '../dto/create-or-update-settings-afk.dto.js'
import {defaultChannels, defaultRoles} from '../constants/defaults.js'
import {SettingsAfkModel} from '../models/settings-afk.model.js'

const collection = new Collection<GuildId, SettingsAfkModel>()

class SettingsAfkManager extends BaseSettingsManager<GuildId, SettingsAfkModel> {
    createOrUpdate(
        guildId: GuildId,
        dto: CreateOrUpdateSettingsAfkDto
    ): Promise<SettingsAfkModel> {
        const guild = this.findOne(guildId)

        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsAfkDto = {
            channels: defaultChannels,
            roles: defaultRoles
        }
        return super.$createOrUpdate(guild,
            {guildId, ...defaultDto, ...dto},
            {guildId, ...dto})
    }
}

export default new SettingsAfkManager(collection, SettingsAfkModel, 'guildId')