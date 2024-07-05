import {Collection} from 'discord.js'
import {GuildId} from '../../../../types/base.type.js'
import {BaseSettingsManager} from '../../managers/base-settings.manager.js'
import {CreateOrUpdateSettingsXpDto} from '../dto/create-or-update-settings-xp.dto.js'
import {
    defaultChannels,
    defaultRewardRole,
    defaultRoles,
    defaultTextGive,
    defaultVoiceGive,
    defaultVoiceStates,
    defaultXpType
} from '../constants/defaults.js'
import {SettingsXpModel} from '../models/settings-xp.model.js'

const collection = new Collection<GuildId, SettingsXpModel>()

class SettingsXpManager extends BaseSettingsManager<GuildId, SettingsXpModel> {
    createOrUpdate(
        guildId: GuildId,
        dto: CreateOrUpdateSettingsXpDto
    ): Promise<SettingsXpModel> {
        const guild = this.findOne(guildId)

        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsXpDto = {
            xpTypes: defaultXpType,
            voiceStates: defaultVoiceStates,
            channels: defaultChannels,
            roles: defaultRoles,
            textGive: defaultTextGive,
            voiceGive: defaultVoiceGive,
            rewardRole: defaultRewardRole
        }
        return super.$createOrUpdate(guild,
            {guildId, ...defaultDto, ...dto},
            {guildId, ...dto})
    }
}

export default new SettingsXpManager(collection, SettingsXpModel, 'guildId')