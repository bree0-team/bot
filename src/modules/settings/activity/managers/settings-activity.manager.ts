import {Collection} from 'discord.js'
import {GuildId} from '../../../../types/base.type.js'
import {BaseSettingsManager} from '../../managers/base-settings.manager.js'
import {defaultChannels, defaultMemberTypes, defaultRoles, defaultVoiceStates} from '../constants/defaults.js'
import {CreateOrUpdateSettingsActivityDto} from '../dto/create-or-update-settings-activity.dto.js'
import {SettingsActivityModel} from '../models/settings-activity.model.js'

const collection = new Collection<GuildId, SettingsActivityModel>()

class SettingsActivityManager extends BaseSettingsManager<GuildId, SettingsActivityModel> {
    createOrUpdate(
        guildId: GuildId,
        dto: CreateOrUpdateSettingsActivityDto
    ): Promise<SettingsActivityModel> {
        const guild = this.findOne(guildId)

        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsActivityDto = {
            memberTypes: defaultMemberTypes,
            voiceStates: defaultVoiceStates,
            channels: defaultChannels,
            roles: defaultRoles
        }
        return super.$createOrUpdate(guild,
            {guildId, ...defaultDto, ...dto},
            {guildId, ...dto})
    }
}

export default new SettingsActivityManager(collection, SettingsActivityModel, 'guildId')