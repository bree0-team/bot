import {ApiProperty} from '@nestjs/swagger'
import {IsInt, IsNotEmpty} from 'class-validator'
import {ClanId} from '../types/clan.type.js'

export class BaseClanIdDto {
    @ApiProperty({
        description: 'Clan ID',
        type: Number,
        example: 1
    })
    @IsNotEmpty()
    @IsInt()
    readonly clanId: ClanId
}