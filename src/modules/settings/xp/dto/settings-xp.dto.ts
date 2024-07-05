import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsArray, IsEnum, IsObject, IsString} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {VoiceStates} from '../../enums/VoiceStates.enum.js'
import {RewardType} from '../enums/RewardType.enum.js'
import {XpType} from '../enums/XpType.enum.js'
import {
    defaultChannels, defaultFormula,
    defaultRewardRole,
    defaultRewardType,
    defaultRoles,
    defaultTextGive,
    defaultVoiceGive,
    defaultXpType
} from '../constants/defaults.js'
import {RewardRoleRecord} from '../models/settings-xp.model.js'

export class SettingsXpDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Type of xp give',
        type: Array,
        example: defaultXpType
    })
    @IsArray()
    readonly xpTypes: XpType[]

    @ApiProperty({
        description: 'Count only certain types of voice state',
        type: Array,
        example: [VoiceStates.SelfDeaf, VoiceStates.ServerMute]
    })
    @IsArray()
    readonly voiceStates: VoiceStates[]

    @ApiProperty({
        description: 'Ignored channels',
        type: Array,
        example: defaultChannels
    })
    @IsArray()
    readonly channels: ChannelId[]

    @ApiProperty({
        description: 'Ignored roles',
        type: Array,
        example: defaultRoles
    })
    @IsArray()
    readonly roles: RoleId[]

    @ApiProperty({
        description: 'Xp range Give for message',
        type: Array,
        example: defaultTextGive
    })
    @IsArray()
    readonly textGive: [number, number]

    @ApiProperty({
        description: 'Xp range Give for voice',
        type: Array,
        example: defaultVoiceGive
    })
    @IsArray()
    readonly voiceGive: [number, number]

    @ApiProperty({
        description: 'Formula for give level',
        type: Array,
        example: defaultFormula
    })
    @IsString()
    readonly formula: string

    @ApiProperty({
        description: 'Type stacked roles for level',
        type: String,
        enum: RewardType,
        example: defaultRewardType
    })
    @IsEnum(RewardType)
    readonly rewardType: RewardType

    @ApiProperty({
        description: 'Role for Level',
        type: Array,
        example: defaultRewardRole
    })
    @IsObject()
    readonly rewardRole: RewardRoleRecord
}