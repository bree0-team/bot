import {ApiProperty, ApiPropertyOptional, IntersectionType} from '@nestjs/swagger'
import {BaseChannelDto} from '../../../../dto/base-channel.dto.js'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {BaseClanIdDto} from '../../dto/base-clan-id.dto.js'
import {ClanChannelModel} from '../models/clan-channel.model.js'
import {IsNumber, IsOptional, IsString} from 'class-validator'

type ClanChannelModelAttrs = Partial<Omit<ClanChannelModel, 'clan'>>

export class ClanChannelDto extends IntersectionType(BaseGuildDto, BaseChannelDto, BaseClanIdDto)
    implements ClanChannelModelAttrs {
    @ApiProperty({
        description: 'Clan channel name',
        type: String,
        example: 'clan name'
    })
    @IsString()
    readonly name: string

    @ApiPropertyOptional({
        description: 'Clan member right on channel',
        type: BigInt,
        example: BigInt(8)
    })
    @IsOptional()
    @IsNumber()
    readonly clanMember?: bigint

    @ApiPropertyOptional({
        description: 'Clan guest right on channel',
        type: BigInt,
        example: BigInt(8)
    })
    @IsOptional()
    @IsNumber()
    readonly clanGuest?: bigint

    @ApiPropertyOptional({
        description: 'Everyone right on channel',
        type: BigInt,
        example: BigInt(8)
    })
    @IsOptional()
    @IsNumber()
    readonly everyone?: bigint
}