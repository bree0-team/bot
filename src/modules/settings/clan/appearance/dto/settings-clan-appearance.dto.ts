import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsBoolean} from 'class-validator'
import {BaseGuildDto} from '../../../../../dto/base-guild.dto.js'

export class SettingsClanAppearanceDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Appearance color',
        type: Boolean,
        example: true
    })
    @IsBoolean()
    readonly color: boolean

    @ApiProperty({
        description: 'Appearance description',
        type: Boolean,
        example: true
    })
    @IsBoolean()
    readonly description: boolean

    @ApiProperty({
        description: 'Appearance avatar',
        type: Boolean,
        example: true
    })
    @IsBoolean()
    readonly avatar: boolean

    @ApiProperty({
        description: 'Appearance banner',
        type: Boolean,
        example: true
    })
    @IsBoolean()
    readonly banner: boolean
}