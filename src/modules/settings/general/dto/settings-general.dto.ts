import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsInt, IsString} from 'class-validator'
import {Locale} from 'discord.js'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {AppLocaleValues} from '../../../locale/helpers/consts.js'

export class SettingsGeneralDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Server Language',
        type: String,
        example: Locale.Russian
    })
    @IsString()
    readonly server_language: AppLocaleValues

    @ApiProperty({
        description: 'System color for messages',
        type: Number,
        example: 123
    })
    @IsInt()
    readonly embed_color: number

    @ApiProperty({
        description: 'Bot timezone',
        type: String,
        example: 'UTC'
    })
    @IsString()
    readonly timezone: string
}