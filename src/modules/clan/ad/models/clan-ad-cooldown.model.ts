import {AllowNull, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript'
import {ClanModel} from '../../models/clan.model.js'
import {ClanId} from '../../types/clan.type.js'

interface ClanAdCooldownAttrs {
    clanId: ClanId
}

interface ClanAdCooldownCreationAttrs extends ClanAdCooldownAttrs {}

@Table({tableName: 'clan_ad_cooldown', updatedAt: false})
export class ClanAdCooldownModel extends Model<ClanAdCooldownAttrs, ClanAdCooldownCreationAttrs> {
    @PrimaryKey
    @ForeignKey(() => ClanModel)
    @Column
    clanId: ClanId

    @AllowNull(false)
    @Column
    updatedAt: Date

    @BelongsTo(() => ClanModel)
    clan: ReturnType<() => ClanModel>
}