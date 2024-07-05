import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsArray, IsNumber, IsString} from 'class-validator'
import {BaseGuildDto} from '../../../../../dto/base-guild.dto.js'
import {ChannelId, MessageId} from '../../../../../types/base.type.js'
import {defaultEnabled} from '../constants/defaults.js'
import {AllChannelRights} from '../types/rights.type.js'

export class SettingsClanChannelDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Channel access settings',
        type: Array,
        example: defaultEnabled
    })
    @IsArray()
    readonly enabled: AllChannelRights[]

    @ApiProperty({
        description: 'Channel category',
        type: String,
        example: '805371598777090049'
    })
    @IsString()
    readonly categoryId: ChannelId

    @ApiProperty({
        description: 'Text channel for clanEmbed',
        type: String,
        example: '805371598777090049'
    })
    @IsString()
    readonly channelId: ChannelId

    @ApiProperty({
        description: 'Message in channel for clanEmbed',
        type: String,
        example: '805371598777090049'
    })
    @IsString()
    readonly messageId: MessageId

    @ApiProperty({
        description: 'Limit for create channels',
        type: Number,
        example: 2
    })
    @IsNumber()
    readonly limit: number
}