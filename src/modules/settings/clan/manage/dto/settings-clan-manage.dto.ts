import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsArray, IsEnum} from 'class-validator'
import {BaseGuildDto} from '../../../../../dto/base-guild.dto.js'
import {RoleId} from '../../../../../types/base.type.js'
import {WhoManage} from '../enums/WhoManage.enum.js'

export class SettingsClanManageDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Who manage clan, member or roles',
        type: String,
        enum: WhoManage,
        example: WhoManage.MEMBER
    })
    @IsEnum(WhoManage)
    readonly who: WhoManage

    @ApiProperty({
        description: 'Roles for manage clan',
        type: Array,
        example: ['805371598777090049']
    })
    @IsArray()
    readonly roles: RoleId[]
}