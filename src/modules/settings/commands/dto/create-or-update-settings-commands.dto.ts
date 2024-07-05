import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {CooldownType} from '../enums/CooldownType.enum.js'
import {SettingsCommandsDto} from './settings-commands.dto.js'

export class CreateOrUpdateSettingsCommandsDto
    extends PartialType(OmitType(SettingsCommandsDto, ['guildId', 'name'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly ephemeral?: boolean

    @ApiPropertyOptional()
    @IsOptional()
    readonly cooldownType?: CooldownType

    @ApiPropertyOptional()
    @IsOptional()
    readonly cooldown?: number

    @ApiPropertyOptional()
    @IsOptional()
    readonly usage?: boolean

    @ApiPropertyOptional()
    @IsOptional()
    readonly reply?: boolean
}