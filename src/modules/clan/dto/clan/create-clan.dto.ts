import {PickType} from '@nestjs/swagger'
import {ClanDto} from './clan.dto.js'

export class CreateClanDto extends PickType(ClanDto, ['emoji', 'name'] as const) {}