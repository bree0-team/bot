import {InteractionReplyOptions} from 'discord.js'
import {ClanAccessCommands} from '../enums/ClanCommands.enum.js'
import {ClanRank, ClanRankInt} from '../enums/ClanRank.enum.js'
import {
	ClanChangeSameRankError,
	ClanMemberNotExistError,
	ClanRankYourselfError,
	ClanSameRankError
} from '../errors/clan.error.js'
import {rankAccess} from '../helpers/rankAccess.js'
import ClanMemberManager from '../managers/clan-member.manager.js'
import ClanManager from '../managers/clan.manager.js'
import {BaseClan} from '../structures/BaseClan.js'

export class Rank extends BaseClan {
	async run() {
		const user = this.getUser('user')
		const rank = this.getString('rank') as ClanRank
		const captain = await rankAccess(this.i, ClanAccessCommands.RANK)

		if (this.userId === user.id) throw new ClanRankYourselfError(this.i)

		const memberManager = ClanMemberManager.findOne(captain.clanId, user.id)
		if (!memberManager) throw new ClanMemberNotExistError(this.i, user.toString())
		if (ClanRankInt[captain.rank] <= ClanRankInt[memberManager.rank]) throw new ClanChangeSameRankError(this.i)
		if (ClanRankInt[captain.rank] <= ClanRankInt[rank]) throw new ClanSameRankError(this.i)

		const clanManager = ClanManager.findOne(captain.clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:rank',
				{author: this.user, user, rank: this.t(`clan:${rank}`)}
			))
		const replyData: InteractionReplyOptions = {embeds: [embed]}
		await this.reply({replyData})
		return ClanMemberManager.update(captain.clanId, user.id, {rank})
	}
}