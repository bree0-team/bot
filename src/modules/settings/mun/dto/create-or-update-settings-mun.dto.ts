import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {SettingsMunDto} from './settings-mun.dto.js'

export class CreateOrUpdateSettingsMunDto extends PartialType(OmitType(SettingsMunDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly channelId?: ChannelId

    @ApiPropertyOptional()
    @IsOptional()
    readonly title?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly description?: string

    @ApiPropertyOptional()
    @IsOptional()
    readonly roles?: RoleId[]
}