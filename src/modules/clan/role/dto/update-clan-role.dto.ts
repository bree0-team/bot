import {PickType} from '@nestjs/swagger'
import {ClanRoleDto} from './clan-role.dto.js'

export class UpdateClanRoleDto extends PickType(ClanRoleDto, ['name'] as const) {}