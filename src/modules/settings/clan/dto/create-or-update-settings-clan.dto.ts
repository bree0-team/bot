import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {SettingsClanDto} from './settings-clan.dto.js'

export class CreateOrUpdateSettingsClanDto extends PartialType(OmitType(SettingsClanDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly member_limit?: number|null

    @ApiPropertyOptional()
    @IsOptional()
    readonly name_pattern?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly role?: boolean

    @ApiPropertyOptional()
    @IsOptional()
    readonly transfer?: boolean
}