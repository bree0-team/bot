import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {RoleId} from '../../../../types/base.type.js'
import {SettingsQaDto} from './settings-qa.dto.js'

export class CreateOrUpdateSettingsQaDto extends PartialType(OmitType(SettingsQaDto, ['guildId', 'channelId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly title?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly description?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly text?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly resp?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly respContent?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly addsResp?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly addsRespContent?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly roles?: RoleId[]
}