import {OmitType} from '@nestjs/swagger'
import {ClanAdDto} from './clan-ad.dto.js'

export class CreateClanAdDto extends OmitType(ClanAdDto, ['guildId', 'clanId'] as const) {}