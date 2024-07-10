import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {RoleId} from '../../../../../types/base.type.js'
import {WhoManage} from '../enums/WhoManage.enum.js'
import {SettingsClanManageDto} from './settings-clan-manage.dto.js'

export class CreateOrUpdateSettingsClanManageDto
    extends PartialType(OmitType(SettingsClanManageDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly who?: WhoManage

    @ApiPropertyOptional()
    @IsOptional()
    readonly roles?: RoleId[]
}