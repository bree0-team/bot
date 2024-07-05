import {AllowNull, Column, Model, Table} from 'sequelize-typescript'
import {CommandName} from '../../../../builders/slash.js'
import {GuildId, UserId} from '../../../../types/base.type.js'

interface CommandsCooldownAttrs {
    guildId: GuildId
    userId: UserId
    name: CommandName
}

interface CommandsCooldownCreationAttrs extends CommandsCooldownAttrs {}

@Table({tableName: 'commands_cooldown', updatedAt: false})
export class CommandsCooldownModel extends Model<CommandsCooldownAttrs, CommandsCooldownCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    userId: UserId

    @AllowNull(false)
    @Column
    name: CommandName

    @AllowNull(false)
    @Column
    updatedAt: Date
}