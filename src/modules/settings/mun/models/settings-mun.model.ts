import {AllowNull, Column, DataType, Default, Table} from 'sequelize-typescript'
import {BaseGuildModel} from '../../../../models/base-guild.model.js'
import {ChannelId, GuildId, RoleId} from '../../../../types/base.type.js'
import {defaultRoles} from '../constants/defaults.js'

interface SettingsMunAttrs {
    guildId: GuildId
    channelId: ChannelId
    title: string
    description: string
    roles: string
}

interface SettingsMunCreationAttrs extends Pick<SettingsMunAttrs, 'guildId'> {
    roles?: RoleId[]
}

@Table({tableName: 'settings_mun'})
export class SettingsMunModel extends BaseGuildModel<SettingsMunAttrs, SettingsMunCreationAttrs> {
    @Column
    channelId: ChannelId

    @Column
    title: string

    @Column(DataType.TEXT)
    description: string

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