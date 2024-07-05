import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsArray} from 'class-validator'
import {BaseGuildDto} from '../../../../../dto/base-guild.dto.js'
import {defaultCaptain, defaultChief, defaultMember, defaultOwner, defaultRecruiter} from '../constants/defaults.js'
import {AllCommandsAccess} from '../types/access.type.js'

export class SettingsClanCommandRankAccessDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Owner rank access',
        type: Array,
        example: defaultOwner
    })
    @IsArray()
    readonly owner: AllCommandsAccess[]

    @ApiProperty({
        description: 'Chief rank access',
        type: Array,
        example: defaultChief
    })
    @IsArray()
    readonly chief: AllCommandsAccess[]

    @ApiProperty({
        description: 'Captain rank access',
        type: Array,
        example: defaultCaptain
    })
    @IsArray()
    readonly captain: AllCommandsAccess[]

    @ApiProperty({
        description: 'Recruiter rank access',
        type: Array,
        example: defaultRecruiter
    })
    @IsArray()
    readonly recruiter: AllCommandsAccess[]

    @ApiProperty({
        description: 'Member rank access',
        type: Array,
        example: defaultMember
    })
    @IsArray()
    readonly member: AllCommandsAccess[]
}