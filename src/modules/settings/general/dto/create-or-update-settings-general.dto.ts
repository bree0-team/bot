import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {Locale} from 'discord.js'
import {SettingsGeneralDto} from './settings-general.dto.js'

export class CreateOrUpdateSettingsGeneralDto extends PartialType(OmitType(SettingsGeneralDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly server_language?: Locale

    @ApiPropertyOptional()
    @IsOptional()
    readonly embed_color?: number

    @ApiPropertyOptional()
    @IsOptional()
    readonly timezone?: string
}