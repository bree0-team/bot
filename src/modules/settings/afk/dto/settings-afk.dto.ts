import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsArray, IsBoolean, IsNumber} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {defaultChannels, defaultRoles, defaultSleep} from '../constants/defaults.js'

export class SettingsAfkDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Afk enabled status',
        type: Boolean,
        example: true
    })
    @IsBoolean()
    readonly value: boolean

    @ApiProperty({
        description: 'Enabled channels from move',
        type: Array,
        example: defaultChannels
    })
    @IsArray()
    readonly channels: ChannelId[]

    @ApiProperty({
        description: 'Ignored roles from move',
        type: Array,
        example: defaultRoles
    })
    @IsArray()
    readonly roles: RoleId[]

    @ApiProperty({
        description: 'Delay before moving',
        type: Number,
        example: defaultSleep
    })
    @IsNumber()
    readonly sleep: number
}