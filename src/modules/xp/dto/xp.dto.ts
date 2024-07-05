import {ApiProperty, IntersectionType} from '@nestjs/swagger'
import {IsNumber} from 'class-validator'
import {BaseGuildDto} from '../../../dto/base-guild.dto.js'
import {BaseUserDto} from '../../../dto/base-user.dto.js'

export class XpDto extends IntersectionType(BaseGuildDto, BaseUserDto) {
    readonly id: number

    @ApiProperty({
        description: 'Xp Count',
        type: Number,
        example: 23
    })
    @IsNumber()
    readonly value: number

    @ApiProperty({
        description: 'User level',
        type: Number,
        example: 0
    })
    @IsNumber()
    readonly level: number
}