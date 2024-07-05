import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {XpDto} from './xp.dto.js'

export class UpdateXpDto extends PartialType(OmitType(XpDto, ['id', 'guildId', 'userId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly value?: number

    @ApiPropertyOptional()
    @IsOptional()
    readonly level?: number
}