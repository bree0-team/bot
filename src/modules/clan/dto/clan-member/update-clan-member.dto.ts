import {ApiPropertyOptional, PartialType, PickType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {ClanRank} from '../../enums/ClanRank.enum.js'
import {ClanRoleId} from '../../types/clan.type.js'
import {ClanMemberDto} from './clan-member.dto.js'

export class UpdateClanMemberDto extends PartialType(PickType(ClanMemberDto, ['rank', 'clanRoleId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly rank?: ClanRank

    @ApiPropertyOptional()
    @IsOptional()
    readonly clanRoleId?: ClanRoleId
}