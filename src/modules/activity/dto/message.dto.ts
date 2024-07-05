import {ApiProperty, IntersectionType} from '@nestjs/swagger'
import {IsDate} from 'class-validator'
import {BaseChannelDto} from '../../../dto/base-channel.dto.js'
import {BaseGuildDto} from '../../../dto/base-guild.dto.js'
import {BaseUserDto} from '../../../dto/base-user.dto.js'

export class MessageDto extends IntersectionType(BaseGuildDto, BaseChannelDto, BaseUserDto) {
    @ApiProperty({
        description: 'Send message in channel date',
        type: Date,
        example: new Date()
    })
    @IsDate()
    readonly send: Date
}