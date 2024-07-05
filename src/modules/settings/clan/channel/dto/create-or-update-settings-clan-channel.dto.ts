import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {ChannelId, MessageId} from '../../../../../types/base.type.js'
import {AllChannelRights} from '../types/rights.type.js'
import {SettingsClanChannelDto} from './settings-clan-channel.dto.js'

export class CreateOrUpdateSettingsClanChannelDto
    extends PartialType(OmitType(SettingsClanChannelDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly enabled?: AllChannelRights[]

    @ApiPropertyOptional()
    @IsOptional()
    readonly categoryId?: ChannelId

    @ApiPropertyOptional()
    @IsOptional()
    readonly channelId?: ChannelId

    @ApiPropertyOptional()
    @IsOptional()
    readonly messageId?: MessageId

    @ApiPropertyOptional()
    @IsOptional()
    readonly limit?: number
}