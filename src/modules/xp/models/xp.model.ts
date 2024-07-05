import {AllowNull, Column, DataType, Default, Model, Table} from 'sequelize-typescript'
import {GuildId, UserId} from '../../../types/base.type.js'

interface XpAttrs {
    guildId: GuildId
    userId: UserId
    value: number
    level: number
}

interface XpCreationAttrs extends XpAttrs {}

@Table({tableName: 'xp'})
export class XpModel extends Model<XpAttrs, XpCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    userId: UserId

    @AllowNull(false)
    @Column(DataType.DOUBLE)
    value: number

    @AllowNull(false)
    @Default(0)
    @Column
    level: number
}