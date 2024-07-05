import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {ChannelId} from '../../../../../types/base.type.js'
import {SettingsClanAdDto} from './settings-clan-ad.dto.js'

export class CreateOrUpdateSettingsClanAdDto extends PartialType(OmitType(SettingsClanAdDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly value?: boolean

    @ApiPropertyOptional()
    @IsOptional()
    readonly channelId?: ChannelId

    @ApiPropertyOptional()
    @IsOptional()
    readonly cooldown?: number
}
