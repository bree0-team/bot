import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {ClanChannelDto} from './clan-channel.dto.js'

export class UpdateClanChannelDto extends PartialType(OmitType(ClanChannelDto, ['guildId', 'channelId', 'clanId'])) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly name?: string
}