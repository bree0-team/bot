import {ApiProperty, IntersectionType} from '@nestjs/swagger'
import {IsArray, IsString} from 'class-validator'
import {BaseChannelDto} from '../../../../dto/base-channel.dto.js'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {RoleId} from '../../../../types/base.type.js'
import {defaultAddsRespContent, defaultRespContent, defaultRoles} from '../constants/defaults.js'

export class SettingsQaDto extends IntersectionType(BaseGuildDto, BaseChannelDto) {
    @ApiProperty({
        description: 'Title embed',
        type: String,
        example: 'Q/A'
    })
    @IsString()
    readonly title: string

    @ApiProperty({
        description: 'Description embed',
        type: String,
        example: 'Q/A desc'
    })
    @IsString()
    readonly description: string

    @ApiProperty({
        description: 'Title text',
        type: String,
        example: 'Q/A from {user}'
    })
    @IsString()
    readonly text: string

    @ApiProperty({
        description: 'Response text',
        type: String,
        example: 'Response from'
    })
    @IsString()
    readonly resp: string

    @ApiProperty({
        description: 'Response text value',
        type: String,
        example: defaultRespContent
    })
    @IsString()
    readonly respContent: string

    @ApiProperty({
        description: 'Additional Response text',
        type: String,
        example: 'Additional Response from'
    })
    @IsString()
    readonly addsResp: string

    @ApiProperty({
        description: 'Additional Response text value',
        type: String,
        example: defaultAddsRespContent
    })
    @IsString()
    readonly addsRespContent: string

    @ApiProperty({
        description: 'Q/A access roles',
        type: String,
        example: defaultRoles
    })
    @IsArray()
    readonly roles: RoleId[]
}