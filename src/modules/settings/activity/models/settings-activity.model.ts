import {AllowNull, Column, DataType, Default, Table} from 'sequelize-typescript'
import {BaseGuildModel} from '../../../../models/base-guild.model.js'
import {ChannelId, GuildId, RoleId} from '../../../../types/base.type.js'
import {VoiceStates} from '../../enums/VoiceStates.enum.js'
import {
    defaultChannels,
    defaultMemberTypes,
    defaultRoles,
    defaultShowDeleted,
    defaultVoiceStates
} from '../constants/defaults.js'
import {MemberType} from '../enums/MemberType.enum.js'

interface SettingsActivityAttrs {
    guildId: GuildId
    showDeleted: boolean
    memberTypes: string
    voiceStates: string
    channels: string
    roles: string
}

interface SettingsActivityCreationAttrs extends Pick<SettingsActivityAttrs, 'guildId'> {
    memberTypes?: MemberType[]
    voiceStates?: VoiceStates[]
    channels?: ChannelId[]
    roles?: RoleId[]
}

@Table({tableName: 'settings_activity'})
export class SettingsActivityModel extends BaseGuildModel<SettingsActivityAttrs, SettingsActivityCreationAttrs> {
    @AllowNull(false)
    @Default(defaultShowDeleted)
    @Column
    showDeleted: boolean

    @AllowNull(false)
    @Default(defaultMemberTypes)
    @Column(DataType.TEXT)
    get memberTypes(): MemberType[] {
        const value = this.getDataValue('memberTypes')
        if (value) return JSON.parse(value)
        return defaultMemberTypes
    }
    set memberTypes(value: MemberType[]) {
        this.setDataValue('memberTypes', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultVoiceStates)
    @Column(DataType.TEXT)
    get voiceStates(): VoiceStates[] {
        const value = this.getDataValue('voiceStates')
        if (value) return JSON.parse(value)
        return defaultVoiceStates
    }
    set voiceStates(value: VoiceStates[]) {
        this.setDataValue('voiceStates', JSON.stringify(value))
    }

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
}