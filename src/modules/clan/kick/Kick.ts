import {userMention} from 'discord.js'
import {UserId} from '../../../types/base.type.js'
import {ClanAccessCommands} from '../enums/ClanCommands.enum.js'
import {ClanRankInt} from '../enums/ClanRank.enum.js'
import {ClanKickSameRankError, ClanKickYourselfError, ClanMemberNotExistError} from '../errors/clan.error.js'
import {rankAccess} from '../helpers/rankAccess.js'
import ClanMemberManager from '../managers/clan-member.manager.js'
import ClanManager from '../managers/clan.manager.js'
import {BaseClan} from '../structures/BaseClan.js'
import {ClanId} from '../types/clan.type.js'
import {KickData} from '../types/data.type.js'
import {CLAN_KICK_CANCEL, CLAN_KICK_CONFIRM} from './enums/CustomIds.enum.js'

export class Kick extends BaseClan {
	async run() {
		const memberOrUser = this.getMemberOrUser('user')
		const chief = await rankAccess(this.i, ClanAccessCommands.KICK)

		if (this.userId === memberOrUser.id) throw new ClanKickYourselfError(this.i)

		const clanMember = ClanMemberManager.findOne(chief.clanId, memberOrUser.id)
		if (!clanMember) throw new ClanMemberNotExistError(this.i, memberOrUser.toString())
		if (ClanRankInt[chief.rank] <= ClanRankInt[clanMember.rank]) throw new ClanKickSameRankError(this.i)

		const clan = ClanManager.findOne(chief.clanId)
		const embed = (await this.clanTitleEmbed(clan))
			.setDescription(this.t('clan:kick:send', {user: memberOrUser}))
		const data: KickData = {clanId: chief.clanId, userId: memberOrUser.id}
		return this.confirm({
			embed, data,
			confirmId: CLAN_KICK_CONFIRM, cancelId: CLAN_KICK_CANCEL
		})
	}
	async accept(clanId: ClanId, userId: UserId) {
		const clan = ClanManager.findOne(clanId)
		const embed = (await this.clanTitleEmbed(clan))
			.setDescription(this.t('clan:kick:confirm', {
				author: this.user, user: userMention(userId)
			}))
		return this.i.editReply({embeds: [embed], components: []})
	}
}