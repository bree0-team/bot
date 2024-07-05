import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {AllCommandsAccess} from '../types/access.type.js'
import {SettingsClanCommandRankAccessDto} from './settings-clan-command-rank-access.dto.js'

export class CreateOrUpdateSettingsClanCommandRankAccessDto
    extends PartialType(OmitType(SettingsClanCommandRankAccessDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly owner?: AllCommandsAccess[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly chief?: AllCommandsAccess[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly captain?: AllCommandsAccess[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly recruiter?: AllCommandsAccess[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly member?: AllCommandsAccess[]
}