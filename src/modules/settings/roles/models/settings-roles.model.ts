import {AllowNull, Column, DataType, Default, Model, Table} from 'sequelize-typescript'
import {GuildId, RoleId} from '../../../../types/base.type.js'
import {defaultRoles} from '../constants/defaults.js'

interface SettingsEditAttrs {
    guildId: GuildId
    roleId: RoleId
    roles: string
}

interface SettingsEditCreationAttrs extends Pick<SettingsEditAttrs, 'guildId'> {
    roles?: RoleId[]
}

@Table({tableName: 'settings_roles'})
export class SettingsRolesModel extends Model<SettingsEditAttrs, SettingsEditCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    roleId: RoleId

    @AllowNull(false)
    @Default(defaultRoles)
    @Column(DataType.TEXT)
    get roles(): RoleId[] {
        const value = this.getDataValue('roles')
        if (value) return JSON.parse(value)
        return defaultRoles
    }
    set roles(value: RoleId[]) {
        this.setDataValue('roles', JSON.stringify(value))
    }
}