import {Collection} from 'discord.js'
import {GuildId} from '../../../../types/base.type.js'
import {BaseSettingsManager} from '../../managers/base-settings.manager.js'
import {SettingsInteractionModel} from '../models/settings-interaction.model.js'

const collection = new Collection<GuildId, SettingsInteractionModel>()

class SettingsInteractionManager extends BaseSettingsManager<GuildId, SettingsInteractionModel> {
    createOrUpdate = (guildId: GuildId, value: number): Promise<SettingsInteractionModel> =>
        super.$createOrUpdate(this.findOne(guildId), {guildId, value})
}

export default new SettingsInteractionManager(collection, SettingsInteractionModel, 'guildId')