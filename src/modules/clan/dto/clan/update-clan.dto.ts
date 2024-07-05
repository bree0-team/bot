import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {ClanDto} from './clan.dto.js'

export class UpdateClanDto extends PartialType(OmitType(ClanDto, ['id', 'guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly emoji?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly name?: string
}