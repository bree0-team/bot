import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsArray} from 'class-validator'
import {BaseGuildDto} from '../../../../../dto/base-guild.dto.js'
import {defaultCaptain, defaultChief, defaultMember, defaultOwner, defaultRecruiter} from '../constants/defaults.js'
import {AllChannelAccess} from '../types/rights.type.js'

export class SettingsClanChannelRankAccessDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Owner rank access',
        type: Array,
        example: defaultOwner
    })
    @IsArray()
    readonly owner: AllChannelAccess[]

    @ApiProperty({
        description: 'Chief rank access',
        type: Array,
        example: defaultChief
    })
    @IsArray()
    readonly chief: AllChannelAccess[]

    @ApiProperty({
        description: 'Captain rank access',
        type: Array,
        example: defaultCaptain
    })
    @IsArray()
    readonly captain: AllChannelAccess[]

    @ApiProperty({
        description: 'Recruiter rank access',
        type: Array,
        example: defaultRecruiter
    })
    @IsArray()
    readonly recruiter: AllChannelAccess[]

    @ApiProperty({
        description: 'Member rank access',
        type: Array,
        example: defaultMember
    })
    @IsArray()
    readonly member: AllChannelAccess[]
}