import {AllowNull, Column, DataType, Default, Table} from 'sequelize-typescript'
import {BaseGuildModel} from '../../../../models/base-guild.model.js'
import {ChannelId, GuildId, RoleId} from '../../../../types/base.type.js'
import {defaultAfk, defaultChannels, defaultRoles, defaultSleep} from '../constants/defaults.js'

interface SettingsAfkAttrs {
    guildId: GuildId
    value: boolean
    channels: string
    roles: string
    sleep: number
}

interface SettingsAfkCreationAttrs extends Pick<SettingsAfkAttrs, 'guildId'> {
    channels?: ChannelId[]
    roles?: RoleId[]
}

@Table({tableName: 'settings_afk'})
export class SettingsAfkModel extends BaseGuildModel<SettingsAfkAttrs, SettingsAfkCreationAttrs> {
    @AllowNull(false)
    @Default(defaultAfk)
    @Column
    value: boolean

    @AllowNull(false)
    @Default(defaultChannels)
    @Column(DataType.TEXT)
    get channels(): ChannelId[] {
        const value = this.getDataValue('channels')
        if (value) return JSON.parse(value)
        return defaultChannels
    }
    set channels(value: ChannelId[]) {
        this.setDataValue('channels', JSON.stringify(value))
    }

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

    @AllowNull(false)
    @Default(defaultSleep)
    @Column
    sleep: number
}