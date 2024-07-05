import {Collection} from 'discord.js'
import {GuildId} from '../../../../../types/base.type.js'
import {BaseSettingsManager} from '../../../managers/base-settings.manager.js'
import {
    CreateOrUpdateSettingsClanCommandRankAccessDto
} from '../dto/create-or-update-settings-clan-command-rank-access.dto.js'
import {defaultCaptain, defaultChief, defaultMember, defaultOwner, defaultRecruiter} from '../constants/defaults.js'
import {SettingsClanCommandRankAccessModel} from '../models/settings-clan-command-rank-access.model.js'

const collection = new Collection<GuildId, SettingsClanCommandRankAccessModel>()

class SettingsClanCommandRankAccessManager extends BaseSettingsManager<GuildId, SettingsClanCommandRankAccessModel> {
    createOrUpdate(
        guildId: GuildId,
        dto: CreateOrUpdateSettingsClanCommandRankAccessDto
    ): Promise<SettingsClanCommandRankAccessModel> {
        const guild = this.findOne(guildId)

        // todo: ValidationErrorItem
        const defaultDto: CreateOrUpdateSettingsClanCommandRankAccessDto = {
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

export default new SettingsClanCommandRankAccessManager(collection, SettingsClanCommandRankAccessModel, 'guildId')