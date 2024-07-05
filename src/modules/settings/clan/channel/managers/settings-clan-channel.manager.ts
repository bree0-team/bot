import {Collection} from 'discord.js'
import {GuildId} from '../../../../../types/base.type.js'
import {BaseSettingsManager} from '../../../managers/base-settings.manager.js'
import {defaultEnabled} from '../constants/defaults.js'
import {CreateOrUpdateSettingsClanChannelDto} from '../dto/create-or-update-settings-clan-channel.dto.js'
import {SettingsClanChannelModel} from '../models/settings-clan-channel.model.js'

const collection = new Collection<GuildId, SettingsClanChannelModel>()

class SettingsClanCommandRankAccessManager extends BaseSettingsManager<GuildId, SettingsClanChannelModel> {
    async createOrUpdate(
        guildId: GuildId,
        dto: CreateOrUpdateSettingsClanChannelDto
    ): Promise<SettingsClanChannelModel> {
        const guild = this.findOne(guildId)

        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsClanChannelDto = {
            enabled: defaultEnabled
        }
        return super.$createOrUpdate(guild,
            {guildId, ...defaultDto, ...dto},
            {guildId, ...dto})
    }
}

export default new SettingsClanCommandRankAccessManager(collection, SettingsClanChannelModel, 'guildId')