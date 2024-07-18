import {Optional} from 'sequelize'
import {AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript'
import {GuildId} from '../../../../types/base.type.js'
import {ClanMemberModel} from '../../models/clan-member.model.js'
import {ClanModel} from '../../models/clan.model.js'
import {ClanId, ClanRoleId} from '../../types/clan.type.js'

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