import {AllowNull, BelongsTo, Column, Default, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript'
import {ChannelId, GuildId} from '../../../../types/base.type.js'
import {ClanModel} from '../../models/clan.model.js'
import {ClanId} from '../../types/clan.type.js'
import {defaultClanGuestRight, defaultClanMemberRight, defaultNotEveryoneRight} from '../constants/defaults.js'

interface ClanChannelAttrs {
    guildId: GuildId
    channelId: ChannelId
    clanId: ClanId
    name: string
    clanMember: bigint
    clanGuest: bigint
    everyone: bigint
}

interface ClanChannelCreationAttrs extends Partial<ClanChannelAttrs> {}

@Table({tableName: 'clan_channel'})
export class ClanChannelModel extends Model<ClanChannelAttrs, ClanChannelCreationAttrs> {
    @Column
    guildId: GuildId

    @PrimaryKey
    @Column
    channelId: ChannelId

    @ForeignKey(() => ClanModel)
    @Column
    clanId: ClanId

    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Default(defaultClanMemberRight)
    @Column
    clanMember: bigint

    @AllowNull(false)
    @Default(defaultClanGuestRight)
    @Column
    clanGuest: bigint

    @AllowNull(false)
    @Default(defaultNotEveryoneRight)
    @Column
    everyone: bigint

    @BelongsTo(() => ClanModel)
    clan: ReturnType<() => ClanModel>
}