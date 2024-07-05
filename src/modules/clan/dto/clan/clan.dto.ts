import {ApiProperty, ApiPropertyOptional, PartialType} from '@nestjs/swagger'
import {IsInt, IsNotEmpty, IsOptional, IsString, IsUrl} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {RoleId} from '../../../../types/base.type.js'
import {ClanModel} from '../../models/clan.model.js'
import {ClanId} from '../../types/clan.type.js'

type ClanModelAttrs = Partial<Omit<ClanModel, 'clanMembers' | 'clanRoles' | 'clanChannels'>>

export class ClanDto extends PartialType(BaseGuildDto) implements ClanModelAttrs {
    @ApiProperty({
        description: 'Clan ID',
        type: Number,
        example: 1
    })
    @IsInt()
    readonly id: ClanId

    @ApiProperty({
        description: 'Default Emoji',
        type: String,
        example: '🏓'
    })
    @IsNotEmpty()
    @IsString()
    readonly emoji: string

    @ApiProperty({
        description: 'Clan name',
        type: String,
        example: 'Ping clan'
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @ApiPropertyOptional({
        description: 'Clan color',
        type: Number,
        example: 123
    })
    @IsOptional()
    @IsInt()
    readonly color: number

    @ApiPropertyOptional({
        description: 'Clan description',
        type: String,
        example: 'New clan for your server'
    })
    @IsOptional()
    @IsString()
    readonly description: string

    @ApiPropertyOptional({
        description: 'Clan avatar',
        type: String,
        example: 'https://example.com/image.png'
    })
    @IsOptional()
    @IsString()
    @IsUrl()
    readonly avatar: string

    @ApiPropertyOptional({
        description: 'Clan banner',
        type: String,
        example: 'https://example.com/image.png'
    })
    @IsOptional()
    @IsString()
    @IsUrl()
    readonly banner: string

    @ApiPropertyOptional({
        description: 'Role id',
        type: String,
        example: '796066769340465203'
    })
    @IsOptional()
    @IsString()
    roleId: RoleId
}
