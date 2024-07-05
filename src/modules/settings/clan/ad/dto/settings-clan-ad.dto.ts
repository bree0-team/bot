import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsBoolean, IsNumber} from 'class-validator'
import {BaseGuildDto} from '../../../../../dto/base-guild.dto.js'
import {ChannelId} from '../../../../../types/base.type.js'

export class SettingsClanAdDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Value of clan ad',
        type: Boolean,
        example: true
    })
    @IsBoolean()
    readonly value: boolean

    @ApiProperty({
        description: 'Channel id of clan ad',
        type: String,
        example: '740919820358254694'
    })
    @IsBoolean()
    readonly channelId: ChannelId

    @ApiProperty({
        description: 'Cooldown for ad message',
        type: Number,
        example: 70
    })
    @IsNumber()
    readonly cooldown: number
}