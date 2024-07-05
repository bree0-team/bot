import {AllowNull, Column, Model, Table} from 'sequelize-typescript'
import {ChannelId, GuildId, UserId} from '../../../types/base.type.js'

interface MessageAttrs {
    guildId: GuildId
    channelId: ChannelId
    userId: UserId
    send: Date
}

interface MessageCreationAttrs extends MessageAttrs {}

@Table({tableName: 'activity_message'})
export class MessageModel extends Model<MessageAttrs, MessageCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    channelId: ChannelId

    @AllowNull(false)
    @Column
    userId: UserId

    @AllowNull(false)
    @Column
    send: Date
}