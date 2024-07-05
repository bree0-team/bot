import {InteractionReplyOptions} from 'discord.js'
import {EmotesImages} from '../../../enums/EmotesImages.enum.js'
import {ClansNotExistsError} from '../errors/clan.error.js'
import ClanManager from '../managers/clan.manager.js'
import {BaseClan} from '../structures/BaseClan.js'
import {RankUtils} from '../utils/rank.js'

export class List extends BaseClan {
	async run() {
		const member = RankUtils.checkMember(this.guildId, this.userId)

		const clans = ClanManager.findAllByGuildId(this.guildId)
		if (!clans.size) throw new ClansNotExistsError(this.i, this.guild.name)

		const clanList = clans.map(clan => `${clan.emoji} \`${clan.name}\``)
		const clan = ClanManager.findOne(member?.clanId)
		const embed = this.clanEmbed(clan)
			.setAuthor({
				name: this.t('clan:list', {guild_name: this.guild.name}),
				iconURL: this.guild.iconURL()
			})
			.setDescription(clanList.join('\n'))
			.setThumbnail(EmotesImages.SWORDSMAN)
		const replyData: InteractionReplyOptions = {embeds: [embed]}
		return this.reply({replyData})
	}
}