import {DataTypes, Optional} from "sequelize";
import {AllowNull, BelongsTo, Column, Default, ForeignKey, IsIn, Model, Table} from 'sequelize-typescript'
import {GuildId, UserId} from '../../../types/base.type.js'
import {ClanRank} from '../enums/ClanRank.enum.js';
import _ from "lodash";
import {defaultRank} from '../constants/defaults.js'
import {ClanId, ClanMemberId, ClanRoleId} from '../types/clan.type.js'
import {ClanRoleModel} from '../role/models/clan-role.model.js'
import {ClanModel} from './clan.model.js'

interface ClanMemberAttrs {
    id: ClanMemberId
    guildId: GuildId
    userId: UserId
    rank: ClanRank
    clanId: ClanId
    clanRoleId: ClanRoleId
}

interface ClaMemberCreationAttrs extends Optional<ClanMemberAttrs, 'id'> {}

const rankValues: ClanRank[] = _.values(ClanRank) as ClanRank[]

@Table({tableName: 'clan_member'})
export class ClanMemberModel extends Model<ClanMemberAttrs, ClaMemberCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    userId: UserId

    @AllowNull(false)
    @Default(defaultRank)
    @IsIn([rankValues])
    @Column(DataTypes.ENUM(...rankValues))
    rank: ClanRank

    @ForeignKey(() => ClanModel)
    @Column
    clanId: ClanId

    @ForeignKey(() => ClanRoleModel)
    @Column
    clanRoleId: ClanRoleId

    @BelongsTo(() => ClanModel)
    clan: ReturnType<() => ClanModel>

    @BelongsTo(() => ClanRoleModel)
    clanRole: ReturnType<() => ClanRoleModel>
}