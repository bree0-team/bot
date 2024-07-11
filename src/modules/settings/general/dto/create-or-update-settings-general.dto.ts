import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {AppLocale} from '../../../locale/helpers/consts.js'
import {SettingsGeneralDto} from './settings-general.dto.js'

export class CreateOrUpdateSettingsGeneralDto extends PartialType(OmitType(SettingsGeneralDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly server_language?: AppLocale

    @ApiPropertyOptional()
    @IsOptional()
    readonly embed_color?: number

    @ApiPropertyOptional()
    @IsOptional()
    readonly timezone?: string
}