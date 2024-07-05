import {ApiPropertyOptional, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {CreateClanAdDto} from './create-clan-ad.dto.js'

export class UpdateClanAdDto extends PartialType(CreateClanAdDto) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly title?: string
}