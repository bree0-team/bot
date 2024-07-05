import {ChatInputCommandInteraction, Collection, InteractionReplyOptions, userMention} from 'discord.js'
import {ClanRankEmoji} from '../../../enums/ClanRankEmoji.enum.js'
import {EmbedField} from '../../../helpers/embed.js'
import {ClanRank} from '../enums/ClanRank.enum.js'
import {ClanNotExistError, ClanYouNotExistError} from '../errors/clan.error.js'
import {sortedRoles} from '../helpers/sortedRoles.js'
import ClanMemberManager from '../managers/clan-member.manager.js'
import ClanManager from '../managers/clan.manager.js'
import {ClanModel} from '../models/clan.model.js'
import {ClanRoleModel} from '../role/models/clan-role.model.js'
import {BaseClan} from '../structures/BaseClan.js'
import {ClanRoleId} from '../types/clan.type.js'
import {RankUtils} from '../utils/rank.js'

export class Members extends BaseClan {
	public i: ChatInputCommandInteraction
	#getFields = (roles: Collection<ClanRoleId, ClanRoleModel>): EmbedField[] => roles.map(clanRole => {
		const memberManager = ClanMemberManager.findAll()
			.filter(i => i.clanId === clanRole.clanId && i.clanRoleId === clanRole.id)
		const membersValue = memberManager
			.map(member => `${userMention(member.userId)} ${member.rank === ClanRank.MEMBER ?
				'' : ClanRankEmoji[member.rank]}`)
			.join('\n');
		return EmbedField(clanRole.name, membersValue !== '' ? membersValue : this.t('no'), true)
	})

	async run() {
		const clanId = this.getString('clan', false)
		let clanManager: ClanModel;

		if (clanId) {
			clanManager = ClanManager.findOne(Number(clanId))
			if (!clanManager || clanManager.guildId !== this.guildId) throw new ClanNotExistError(this.i)
		} else {
			const member = RankUtils.checkMember(this.guildId, this.userId)
			if (!member) throw new ClanYouNotExistError(this.i, {
				name: this.t('use'),
				value: `</clan members:${this.i.commandId}> \`[clan_id]\``
			})
			clanManager = ClanManager.findOne(member.clanId)
		}

		const listRoles = sortedRoles(clanManager.id)
		const embed = (await this.clanTitleEmbed(clanManager))
			.addFields(this.#getFields(listRoles))
		if (clanManager.description) embed.setDescription(clanManager.description)
		const replyData: InteractionReplyOptions = {embeds: [embed]}
		return this.reply({replyData})
	}
}