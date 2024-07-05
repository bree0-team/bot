import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsString} from 'class-validator'
import {MessageId} from '../types/base.type.js'

export class BaseMessageDto {
    @ApiProperty({
        description: 'Message ID',
        type: String,
        example: '1221463636153860196'
    })
    @IsNotEmpty()
    @IsString()
    readonly messageId: MessageId
}
