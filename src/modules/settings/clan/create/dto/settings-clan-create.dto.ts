import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsArray, IsEnum} from 'class-validator'
import {BaseGuildDto} from '../../../../../dto/base-guild.dto.js'
import {RoleId} from '../../../../../types/base.type.js'
import {WhoCreate} from '../enums/WhoCreate.enum.js'

export class SettingsClanCreateDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Who creates clan, member or roles',
        type: String,
        enum: WhoCreate,
        example: WhoCreate.MEMBER
    })
    @IsEnum(WhoCreate)
    readonly who: WhoCreate

    @ApiProperty({
        description: 'Roles for clan create',
        type: Array,
        example: ['805371598777090049']
    })
    @IsArray()
    readonly roles: RoleId[]
}