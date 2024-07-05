import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {AllChannelAccess} from '../types/rights.type.js'
import {SettingsClanChannelRankAccessDto} from './settings-clan-channel-rank-access.dto.js'

export class CreateOrUpdateSettingsClanChannelRankAccessDto
    extends PartialType(OmitType(SettingsClanChannelRankAccessDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly owner?: AllChannelAccess[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly chief?: AllChannelAccess[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly captain?: AllChannelAccess[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly recruiter?: AllChannelAccess[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly member?: AllChannelAccess[]
}