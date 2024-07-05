import _ from 'lodash'
import {AllowNull, Column, DataType, Default, IsIn, Table} from 'sequelize-typescript'
import {BaseGuildModel} from '../../../../models/base-guild.model.js'
import {ChannelId, GuildId, RoleId} from '../../../../types/base.type.js'
import {VoiceStates} from '../../enums/VoiceStates.enum.js'
import {RewardType} from '../enums/RewardType.enum.js'
import {XpType} from '../enums/XpType.enum.js'
import {
    defaultChannels,
    defaultFormula,
    defaultRewardRole,
    defaultRewardType,
    defaultRoles,
    defaultTextGive,
    defaultVoiceGive,
    defaultVoiceStates,
    defaultXpType
} from '../constants/defaults.js'

export type RewardRoleRecord = Record<string, RoleId[]>//{[x: string]: RoleId[]}

interface SettingsXpAttrs {
    guildId: GuildId
    xpTypes: string
    voiceStates: string
    channels: string
    roles: string
    textGive: string
    voiceGive: string
    formula: string
    rewardRole: string
    rewardType: RewardType
}

interface SettingsXpCreationAttrs extends Pick<SettingsXpAttrs, 'guildId'> {
    xpTypes?: XpType[]
    voiceStates?: VoiceStates[]
    channels?: ChannelId[]
    roles?: RoleId[]
    textGive?: [number, number]
    voiceGive?: [number, number]
    rewardRole?: RewardRoleRecord
}

const rewardTypeValues: RewardType[] = _.values(RewardType)

@Table({tableName: 'settings_xp'})
export class SettingsXpModel extends BaseGuildModel<SettingsXpAttrs, SettingsXpCreationAttrs> {
    @AllowNull(false)
    @Default(defaultXpType)
    @Column(DataType.TEXT)
    get xpTypes(): XpType[] {
        const value = this.getDataValue('xpTypes')
        if (value) return JSON.parse(value)
        return defaultXpType
    }
    set xpTypes(value: XpType[]) {
        this.setDataValue('xpTypes', JSON.stringify(value))
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

    @AllowNull(false)
    @Default(defaultTextGive)
    @Column(DataType.TEXT)
    get textGive(): [number, number] {
        const value = this.getDataValue('textGive')
        if (value) return JSON.parse(value)
        return defaultTextGive
    }
    set textGive(value: [number, number]) {
        this.setDataValue('textGive', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultVoiceGive)
    @Column(DataType.TEXT)
    get voiceGive(): [number, number] {
        const value = this.getDataValue('voiceGive')
        if (value) return JSON.parse(value)
        return defaultVoiceGive
    }
    set voiceGive(value: [number, number]) {
        this.setDataValue('voiceGive', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultFormula)
    @Column
    formula: string

    @AllowNull(false)
    @Default(defaultRewardRole)
    @Column(DataType.TEXT)
    get rewardRole(): RewardRoleRecord {
        return JSON.parse(<string>this.getDataValue('rewardRole'))
    }
    set rewardRole(value: RewardRoleRecord) {
        this.setDataValue('rewardRole', JSON.stringify(value))
    }

    @AllowNull(false)
    @Default(defaultRewardType)
    @IsIn([rewardTypeValues])
    @Column(DataType.ENUM(...rewardTypeValues))
    rewardType: RewardType
}