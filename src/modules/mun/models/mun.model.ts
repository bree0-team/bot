import _ from 'lodash'
import {AllowNull, Column, DataType, IsIn, Model, PrimaryKey, Table} from 'sequelize-typescript'
import {ChannelId, GuildId, MessageId, UserId} from '../../../types/base.type.js'
import {MunStatus} from '../enums/MunStatus.enum.js'

interface MunAttrs {
    guildId: GuildId
    channelId: ChannelId
    messageId: MessageId
    userId: UserId
    oldValue: string
    newValue: string
    changerId: UserId
    status: MunStatus
}

interface MunCreationAttrs extends MunAttrs {}

const munStatusValues: MunStatus[] = _.values(MunStatus)

@Table({tableName: 'mun'})
export class MunModel extends Model<MunAttrs, MunCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    channelId: ChannelId

    @PrimaryKey
    @Column
    messageId: MessageId

    @AllowNull(false)
    @Column
    userId: UserId

    @AllowNull(false)
    @Column
    oldValue: string

    @AllowNull(false)
    @Column
    newValue: string

    @Column
    changerId: UserId

    @IsIn([munStatusValues])
    @Column(DataType.ENUM(...munStatusValues))
    status: MunStatus
}