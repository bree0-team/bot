import {DataTypes, Optional} from "sequelize";
import {AllowNull, Column, Table, Model, HasMany} from 'sequelize-typescript'
import {GuildId, RoleId} from '../../../types/base.type.js'
import {ClanAdModel} from '../ad/models/clan-ad.model.js'
import {ClanChannelModel} from '../channel/models/clan-channel.model.js'
import {ClanId} from '../types/clan.type.js'
import {ClanMemberModel} from './clan-member.model.js'
import {ClanRoleModel} from '../role/models/clan-role.model.js'

interface ClanAttrs {
    id: ClanId
    guildId: GuildId
    emoji: string
    name: string
    color: number
    description: string
    avatar: string
    banner: string
    roleId: RoleId
}

interface ClanCreationAttrs extends Optional<ClanAttrs, 'id'> {}

@Table({tableName: 'clan'})
export class ClanModel extends Model<ClanAttrs, ClanCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    emoji: string

    @AllowNull(false)
    @Column
    name: string

    @Column
    color: number

    @Column(DataTypes.TEXT)
    description: string

    @Column
    avatar: string

    @Column
    banner: string

    @Column
    roleId: RoleId

    @HasMany(() => ClanMemberModel, {onDelete: 'CASCADE', onUpdate: 'RESTRICT'})
    clanMembers: ReturnType<() => ClanMemberModel[]>

    @HasMany(() => ClanRoleModel, {onDelete: 'CASCADE', onUpdate: 'RESTRICT'})
    clanRoles: ReturnType<() => ClanRoleModel[]>

    @HasMany(() => ClanChannelModel, {onDelete: 'CASCADE', onUpdate: 'RESTRICT'})
    clanChannels: ReturnType<() => ClanChannelModel[]>

    @HasMany(() => ClanAdModel, {onDelete: 'CASCADE', onUpdate: 'RESTRICT'})
    clanAds: ReturnType<() => ClanAdModel[]>
}