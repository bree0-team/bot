import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsString} from 'class-validator'
import {UserId} from '../types/base.type.js'

export class BaseUserDto {
    @ApiProperty({
        description: 'User ID',
        type: String,
        example: '370169617039228928'
    })
    @IsNotEmpty()
    @IsString()
    readonly userId: UserId
}
