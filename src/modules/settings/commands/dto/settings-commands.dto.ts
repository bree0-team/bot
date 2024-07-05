import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsBoolean, IsEnum, IsNumber, IsString} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {CommandName} from '../../../../builders/slash.js'
import {CooldownType} from '../enums/CooldownType.enum.js'

export class SettingsCommandsDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Command name',
        type: String,
        example: 'clan'
    })
    @IsString()
    readonly name: CommandName

    @ApiProperty({
        description: 'Ephemeral message',
        type: Boolean,
        example: false
    })
    @IsBoolean()
    readonly ephemeral: boolean

    @ApiProperty({
        description: 'Cooldown type',
        type: String,
        enum: CooldownType,
        example: null,
    })
    @IsEnum(CooldownType)
    readonly cooldownType: CooldownType

    @ApiProperty({
        description: 'Cooldown in seconds',
        type: Number,
        example: 20
    })
    @IsNumber()
    readonly cooldown: number

    @ApiProperty({
        description: 'Show usage user commands',
        type: Boolean,
        example: false
    })
    @IsBoolean()
    readonly usage: boolean

    @ApiProperty({
        description: 'Show bot reply command',
        type: Boolean,
        example: false
    })
    @IsBoolean()
    readonly reply: boolean
}