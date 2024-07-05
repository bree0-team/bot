import _ from 'lodash'
import {AllowNull, Column, DataType, IsIn, Model, Table} from 'sequelize-typescript'
import {ChannelId, GuildId, MessageId, UserId} from '../../../types/base.type.js'
import {QaStatus} from '../enums/QaStatus.enum.js'

interface QaAttrs {
    guildId: GuildId
    channelId: ChannelId
    messageId: MessageId
    userId: UserId
    status: QaStatus
    title: string
    description: string
}

interface QaCreationAttrs extends QaAttrs {}

const qaStatusValues: QaStatus[] = _.values(QaStatus)

@Table({tableName: 'qa'})
export class QaModel extends Model<QaAttrs, QaCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    channelId: GuildId

    @AllowNull(false)
    @Column
    messageId: MessageId

    @AllowNull(false)
    @Column
    userId: UserId

    @AllowNull(false)
    @IsIn([qaStatusValues])
    @Column(DataType.ENUM(...qaStatusValues))
    status: QaStatus

    @Column
    title: string

    @Column(DataType.TEXT)
    description: string
}