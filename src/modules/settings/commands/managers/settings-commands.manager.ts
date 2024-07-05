import {Collection} from 'discord.js'
import {ModelManager} from '../../../../managers/model.js'
import {CommandName} from '../../../../builders/slash.js'
import {GuildId} from '../../../../types/base.type.js'
import {CreateOrUpdateSettingsCommandsDto} from '../dto/create-or-update-settings-commands.dto.js'
import {SettingsCommandsModel} from '../models/settings-commands.model.js'

const collection = new Collection<number, SettingsCommandsModel>()

class SettingsCommandsManager extends ModelManager<number, SettingsCommandsModel> {
    createOrUpdate = (
        guildId: GuildId,
        name: CommandName,
        dto?: CreateOrUpdateSettingsCommandsDto
    ): Promise<SettingsCommandsModel> => super.$createOrUpdate(this.findOne(guildId, name), {
        guildId, name, ...dto
    })
    findOne = (guildId: GuildId, name: CommandName): SettingsCommandsModel|undefined => this.collection
        .find(i => i.guildId === guildId && i.name === name)
    async getOne(guildId: GuildId, name: CommandName): Promise<SettingsCommandsModel> {
        let guild = this.findOne(guildId, name)
        if (!guild) guild = await this.createOrUpdate(guildId, name)
        return guild
    }
}

export default new SettingsCommandsManager(collection, SettingsCommandsModel)