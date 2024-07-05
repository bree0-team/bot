import {Column, Model, PrimaryKey} from 'sequelize-typescript'
import {GuildId} from '../types/base.type.js'

export abstract class BaseGuildModel<Attributes extends {} = any, CreationAttributes extends {} = Attributes>
    extends Model<Attributes, CreationAttributes> {
    @PrimaryKey
    @Column
    guildId: GuildId
}