import {AllowNull, Column, DataType, Default, Model, Table} from 'sequelize-typescript'
import {ChannelId, GuildId, RoleId} from '../../../../types/base.type.js'
import {defaultAddsRespContent, defaultRespContent, defaultRoles} from '../constants/defaults.js'

interface SettingsQaAttrs {
    guildId: GuildId
    channelId: ChannelId
    text: string
    resp: string
    respContent: string
    addsResp: string
    addsRespContent: string
    roles: string
}

interface SettingsQaCreationAttrs extends Pick<SettingsQaAttrs, 'guildId'> {
    roles?: RoleId[]
}

@Table({tableName: 'settings_qa'})
export class SettingsQaModel extends Model<SettingsQaAttrs, SettingsQaCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column
    channelId: ChannelId

    @Column
    title: string

    @Column
    description: string

    @AllowNull(false)
    @Column
    text: string

    @AllowNull(false)
    @Column
    resp: string

    @AllowNull(false)
    @Default(defaultRespContent)
    @Column
    respContent: string

    @AllowNull(false)
    @Column
    addsResp: string

    @AllowNull(false)
    @Default(defaultAddsRespContent)
    @Column
    addsRespContent: string

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