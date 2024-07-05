import {AllowNull, Column, Default, Table} from 'sequelize-typescript'
import {GuildId} from '../../../../types/base.type.js'
import {BaseGuildModel} from '../../../../models/base-guild.model.js'
import {defaultNamePattern, defaultRole, defaultTransfer} from '../constants/defaults.js'

interface SettingsClanAttrs {
    guildId: GuildId
    member_limit: number|null
    name_pattern: string
    role: boolean
    transfer: boolean
}

interface SettingsClanCreationAttrs extends Pick<SettingsClanAttrs, 'guildId'> {}

@Table({tableName: 'settings_clan'})
export class SettingsClanModel extends BaseGuildModel<SettingsClanAttrs, SettingsClanCreationAttrs> {
    @Column
    member_limit: number|null

    @AllowNull(false)
    @Default(defaultNamePattern)
    @Column
    name_pattern: string

    @AllowNull(false)
    @Default(defaultRole)
    @Column
    role: boolean

    @AllowNull(false)
    @Default(defaultTransfer)
    @Column
    transfer: boolean
}