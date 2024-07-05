import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsBoolean, IsString} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'

export class SettingsBannerDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Background url',
        type: String,
        example: 'https://example.com/image.png'
    })
    @IsString()
    readonly url: string

    @ApiProperty({
        description: 'Enabled status',
        type: Boolean,
        example: false
    })
    @IsBoolean()
    readonly enabled: boolean
}