import {ApiProperty, IntersectionType} from '@nestjs/swagger'
import {IsArray, IsString} from 'class-validator'
import {BaseChannelDto} from '../../../../dto/base-channel.dto.js'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {RoleId} from '../../../../types/base.type.js'
import {defaultRoles} from '../constants/defaults.js'

export class SettingsMunDto extends IntersectionType(BaseGuildDto, BaseChannelDto) {
    @ApiProperty({
        description: 'Embed title',
        type: String,
        example: 'Change your nickname'
    })
    @IsString()
    readonly title: string

    @ApiProperty({
        description: 'Embed description',
        type: String,
        example: 'idk what you need'
    })
    @IsString()
    readonly description: string

    @ApiProperty({
        description: 'Access Roles',
        type: Array,
        example: defaultRoles
    })
    @IsArray()
    readonly roles: RoleId[]
}