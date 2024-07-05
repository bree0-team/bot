import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {SettingsAfkDto} from './settings-afk.dto.js'

export class CreateOrUpdateSettingsAfkDto extends PartialType(OmitType(SettingsAfkDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly value?: boolean

    @ApiPropertyOptional()
    @IsOptional()
    readonly channels?: ChannelId[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly roles?: RoleId[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly sleep?: number
}