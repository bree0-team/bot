import {ApiProperty, IntersectionType} from '@nestjs/swagger'
import {IsEnum, IsInt, IsNotEmpty} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {BaseUserDto} from '../../../../dto/base-user.dto.js'
import {ClanRank} from '../../enums/ClanRank.enum.js'
import {ClanMemberModel} from '../../models/clan-member.model.js'
import {ClanMemberId, ClanRoleId} from '../../types/clan.type.js'
import {BaseClanIdDto} from '../base-clan-id.dto.js'

type ClanMemberModelAttrs = Partial<Omit<ClanMemberModel, 'clan' | 'clanRole'>>

export class ClanMemberDto extends IntersectionType(BaseGuildDto, BaseUserDto, BaseClanIdDto)
    implements ClanMemberModelAttrs {
    @ApiProperty({
        description: 'Clan Member ID',
        type: Number,
        example: 1
    })
    @IsInt()
    readonly id: ClanMemberId

    @ApiProperty({
        description: 'Clan Rank',
        type: String,
        enum: ClanRank,
        example: ClanRank.MEMBER
    })
    @IsNotEmpty()
    @IsEnum(ClanRank)
    readonly rank: ClanRank

    @ApiProperty({
        description: 'Clan Role ID',
        type: Number,
        example: 1
    })
    @IsNotEmpty()
    @IsInt()
    readonly clanRoleId: ClanRoleId
}