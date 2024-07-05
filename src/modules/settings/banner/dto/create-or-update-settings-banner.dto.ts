import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {SettingsBannerDto} from './settings-banner.dto.js'

export class CreateOrUpdateSettingsBannerDto extends PartialType(OmitType(SettingsBannerDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly url?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly enabled?: boolean
}