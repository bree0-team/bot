import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsString} from 'class-validator'
import {GuildId} from '../types/base.type.js'

export class BaseGuildDto {
    @ApiProperty({
        description: 'Guild ID',
        type: String,
        example: '405360988280455168'
    })
    @IsNotEmpty()
    @IsString()
    readonly guildId: GuildId
}
