import {ApiProperty, IntersectionType} from '@nestjs/swagger'
import {IsArray} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {BaseRoleDto} from '../../../../dto/base-role.dto.js'
import {RoleId} from '../../../../types/base.type.js'
import {defaultRoles} from '../constants/defaults.js'

export class SettingsRolesDto extends IntersectionType(BaseGuildDto, BaseRoleDto) {
    @ApiProperty({
        description: 'Member can assign these roles',
        type: Array,
        example: defaultRoles
    })
    @IsArray()
    readonly roles: RoleId[]
}