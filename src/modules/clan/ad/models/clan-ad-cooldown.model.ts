import {AllowNull, Column, Model, PrimaryKey, Table} from 'sequelize-typescript'
import {ClanId} from '../../types/clan.type.js'

interface ClanAdCooldownAttrs {
    clanId: ClanId
}

interface ClanAdCooldownCreationAttrs extends ClanAdCooldownAttrs {}

@Table({tableName: 'clan_ad_cooldown', updatedAt: false})
export class ClanAdCooldownModel extends Model<ClanAdCooldownAttrs, ClanAdCooldownCreationAttrs> {
    @PrimaryKey
    @Column
    clanId: ClanId

    @AllowNull(false)
    @Column
    updatedAt: Date
}