import {PickType} from '@nestjs/swagger'
import {ClanRoleDto} from './clan-role.dto.js'

export class CreateClanRoleDto extends PickType(ClanRoleDto, ['name', 'isDefault'] as const) {}