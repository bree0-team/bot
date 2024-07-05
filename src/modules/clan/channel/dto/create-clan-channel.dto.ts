import {OmitType} from '@nestjs/swagger'
import {ClanChannelDto} from './clan-channel.dto.js'

export class CreateClanChannelDto extends OmitType(ClanChannelDto, ['guildId', 'channelId', 'clanId']) {}