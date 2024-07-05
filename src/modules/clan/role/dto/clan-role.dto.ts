import {ApiProperty, ApiPropertyOptional, IntersectionType} from '@nestjs/swagger'
import {IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {ClanRoleModel} from '../models/clan-role.model.js'
import {ClanRoleId} from '../../types/clan.type.js'
import {BaseClanIdDto} from '../../dto/base-clan-id.dto.js'

type ClanRoleModelAttrs = Partial<Omit<ClanRoleModel, 'clan' | 'clanMembers'>>

export class ClanRoleDto extends IntersectionType(BaseGuildDto, BaseClanIdDto) implements ClanRoleModelAttrs {
    @ApiProperty({
        description: 'Clan Role ID',
        type: Number,
        example: 1
    })
    @IsInt()
    readonly id: ClanRoleId

    @ApiProperty({
        description: 'Role name',
        type: String,
        example: 'Super User'
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @ApiPropertyOptional({
        description: 'For default role value',
        type: Boolean,
        example: false
    })
    @IsOptional()
    @IsBoolean()
    readonly isDefault?: boolean
}