import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {MemberType} from '../enums/MemberType.enum.js'
import {VoiceStates} from '../../enums/VoiceStates.enum.js'
import {SettingsActivityDto} from './settings-activity.dto.js'

export class CreateOrUpdateSettingsActivityDto extends PartialType(OmitType(SettingsActivityDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly showDeleted?: boolean

    @ApiPropertyOptional()
    @IsOptional()
    readonly memberTypes?: MemberType[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly voiceStates?: VoiceStates[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly channels?: ChannelId[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly roles?: RoleId[]
}