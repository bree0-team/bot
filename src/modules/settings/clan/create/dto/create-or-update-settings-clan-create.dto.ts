import {ApiPropertyOptional, OmitType, PartialType} from '@nestjs/swagger'
import {IsOptional} from 'class-validator'
import {RoleId} from '../../../../../types/base.type.js'
import {WhoCreate} from '../enums/WhoCreate.enum.js'
import {SettingsClanCreateDto} from './settings-clan-create.dto.js'

export class CreateOrUpdateSettingsClanCreateDto
    extends PartialType(OmitType(SettingsClanCreateDto, ['guildId'] as const)) {
    @ApiPropertyOptional()
    @IsOptional()
    readonly who?: WhoCreate

    @ApiPropertyOptional()
    @IsOptional()
    readonly roles?: RoleId[]
}