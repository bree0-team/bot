import {ApiPropertyOptional, PartialType, PickType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {ClanRank} from '../../enums/ClanRank.enum.js'
import {ClanMemberDto} from './clan-member.dto.js'

export class CreateClanMemberDto extends PartialType(PickType(ClanMemberDto, ['userId', 'rank', 'clanRoleId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly rank?: ClanRank
}