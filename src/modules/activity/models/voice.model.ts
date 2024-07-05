import {AllowNull, Column, Model, Table} from 'sequelize-typescript'
import {ChannelId, GuildId, UserId} from '../../../types/base.type.js'

interface VoiceAttrs {
    guildId: GuildId
    channelId: ChannelId
    userId: UserId
    before: Date
    after: Date
}

interface VoiceCreationAttrs extends VoiceAttrs {}

@Table({tableName: 'activity_voice'})
export class VoiceModel extends Model<VoiceAttrs, VoiceCreationAttrs> {
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
    before: Date

    @AllowNull(false)
    @Column
    after: Date
}