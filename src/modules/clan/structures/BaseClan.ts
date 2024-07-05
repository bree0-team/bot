import {EmbedBuilder} from 'discord.js'
import {BaseStructure} from '../../../structures/base.js'
import {UserId} from '../../../types/base.type.js'
import {clanEmbed, clanTitleEmbed} from '../helpers/embed.js'
import {ClanModel} from '../models/clan.model.js'
import {NamePatternUtils} from '../utils/name-pattern.js'
import {RankUtils} from '../utils/rank.js'

export abstract class BaseClan extends BaseStructure {
	isOwner = (): boolean => RankUtils.isOwner(this.guildId, this.userId)
	isChief = (): boolean => RankUtils.isChief(this.guildId, this.userId)
	isCaptain = (): boolean => RankUtils.isCaptain(this.guildId, this.userId)
	isRecruiter = (): boolean => RankUtils.isRecruiter(this.guildId, this.userId)
	isMember = (userId?: UserId): boolean => RankUtils.isMember(this.guildId, userId || this.userId)
	name = (clan: ClanModel): Promise<string> => NamePatternUtils.getPattern(clan)
	clanEmbed = (clan: ClanModel): EmbedBuilder => clanEmbed(clan)
	clanTitleEmbed = (clan: ClanModel, title?: string): Promise<EmbedBuilder> => clanTitleEmbed(clan,
		title ?? this.t('clan:clan'))
}