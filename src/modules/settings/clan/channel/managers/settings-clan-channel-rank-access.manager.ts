import {Collection} from 'discord.js'
import {GuildId} from '../../../../../types/base.type.js'
import {BaseSettingsManager} from '../../../managers/base-settings.manager.js'
import {defaultCaptain, defaultChief, defaultMember, defaultOwner, defaultRecruiter} from '../constants/defaults.js'
import {
    CreateOrUpdateSettingsClanChannelRankAccessDto
} from '../dto/create-or-update-settings-clan-channel-rank-access.dto.js'
import {SettingsClanChannelRankAccessModel} from '../models/settings-clan-channel-rank-access.model.js'

const collection = new Collection<GuildId, SettingsClanChannelRankAccessModel>()

class SettingsClanChannelRankAccessManager extends BaseSettingsManager<GuildId, SettingsClanChannelRankAccessModel> {
    async createOrUpdate(
        guildId: GuildId,
        dto: CreateOrUpdateSettingsClanChannelRankAccessDto
    ): Promise<SettingsClanChannelRankAccessModel> {
        const guild = this.findOne(guildId)

        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsClanChannelRankAccessDto = {
            owner: defaultOwner,
            chief: defaultChief,
            captain: defaultCaptain,
            recruiter: defaultRecruiter,
            member: defaultMember,
        }
        return super.$createOrUpdate(guild,
            {guildId, ...defaultDto, ...dto},
            {guildId, ...dto})
    }
}

export default new SettingsClanChannelRankAccessManager(collection, SettingsClanChannelRankAccessModel, 'guildId')