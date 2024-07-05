import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsString} from 'class-validator'
import {ChannelId} from '../types/base.type.js'

export class BaseChannelDto {
    @ApiProperty({
        description: 'Channel ID',
        type: String,
        example: '1043825273210142810'
    })
    @IsNotEmpty()
    @IsString()
    readonly channelId: ChannelId
}
