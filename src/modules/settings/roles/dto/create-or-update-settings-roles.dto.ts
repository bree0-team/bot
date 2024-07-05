import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {RoleId} from '../../../../types/base.type.js'
import {SettingsRolesDto} from './settings-roles.dto.js'

export class CreateOrUpdateSettingsRolesDto extends PartialType(OmitType(SettingsRolesDto, ['guildId', 'roleId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly roles?: RoleId[]
}