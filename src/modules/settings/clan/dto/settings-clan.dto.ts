import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsBoolean, IsInt, IsString} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'

export class SettingsClanDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Limit members of clan',
        type: Number,
        example: null
    })
    @IsInt()
    readonly member_limit: number|null

    @ApiProperty({
        description: 'Default clan name pattern',
        type: String,
        example: '{emoji} {name}'
    })
    @IsString()
    readonly name_pattern: string

    @ApiProperty({
        description: 'Value of clan role',
        type: Boolean,
        example: true
    })
    @IsBoolean()
    readonly role: boolean

    @ApiProperty({
        description: 'Rights for clan transfer',
        type: Boolean,
        example: true
    })
    @IsBoolean()
    readonly transfer: boolean
}