import {Model, AllowNull, Column, Table, HasMany, BelongsTo, ForeignKey, Default} from 'sequelize-typescript'
import {Optional} from "sequelize";
import {GuildId} from '../../../../types/base.type.js'
import {ClanId, ClanRoleId} from '../../types/clan.type.js'
import {ClanModel} from '../../models/clan.model.js'
import {ClanMemberModel} from '../../models/clan-member.model.js'

interface ClanRoleAttrs {
    id: ClanRoleId
    guildId: GuildId
    name: string
    isDefault: boolean
    clanId: ClanId
}

interface ClanRoleCreationAttrs extends Optional<ClanRoleAttrs, 'id'> {}

@Table({tableName: 'clan_role'})
export class ClanRoleModel extends Model<ClanRoleAttrs, ClanRoleCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    name: string

    @Column
    isDefault: boolean

    @ForeignKey(() => ClanModel)
    @Column
    clanId: ClanId

    @BelongsTo(() => ClanModel)
    clan: ReturnType<() => ClanModel>

    @HasMany(() => ClanMemberModel, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
    clanMembers: ReturnType<() => ClanMemberModel[]>
}