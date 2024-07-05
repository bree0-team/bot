import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {VoiceStates} from '../../enums/VoiceStates.enum.js'
import {RewardType} from '../enums/RewardType.enum.js'
import {XpType} from '../enums/XpType.enum.js'
import {RewardRoleRecord} from '../models/settings-xp.model.js'
import {SettingsXpDto} from './settings-xp.dto.js'

export class CreateOrUpdateSettingsXpDto extends PartialType(OmitType(SettingsXpDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly xpTypes?: XpType[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly voiceStates?: VoiceStates[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly channels?: ChannelId[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly roles?: RoleId[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly textGive?: [number, number]

    @ApiPropertyOptional()
    @IsOptional()
    readonly voiceGive?: [number, number]

    @ApiPropertyOptional()
    @IsOptional()
    readonly formula?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly rewardType?: RewardType

    @ApiPropertyOptional()
    @IsOptional()
    readonly rewardRole?: RewardRoleRecord
}