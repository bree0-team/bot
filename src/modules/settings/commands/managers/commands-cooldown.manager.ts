import {Collection} from 'discord.js'
import {ModelManager} from '../../../../managers/model.js'
import {CommandName} from '../../../../builders/slash.js'
import {GuildId, UserId} from '../../../../types/base.type.js'
import {CommandsCooldownModel} from '../models/commands-cooldown.model.js'

const collection = new Collection<number, CommandsCooldownModel>()

class CommandsCooldownManager extends ModelManager<number, CommandsCooldownModel> {
    createOrUpdate = (guildId: GuildId, userId: UserId, name: CommandName): Promise<CommandsCooldownModel> =>
        super.$createOrUpdate(this.findOne(guildId, name, userId), {
            guildId, userId, name, updatedAt: new Date()
        })
    findOne = (guildId: GuildId, name: CommandName, userId?: UserId): CommandsCooldownModel | undefined =>
        this.collection.find(i => userId
            ? i.guildId === guildId && i.userId === userId && i.name === name
            : i.guildId === guildId && i.name === name
        )
}

export default new CommandsCooldownManager(collection, CommandsCooldownModel)