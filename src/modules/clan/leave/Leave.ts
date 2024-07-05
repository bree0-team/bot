import {ClanOwnerLeaveError, ClanYouNotExistError} from '../errors/clan.error.js'
import ClanManager from '../managers/clan.manager.js'
import {BaseClan} from '../structures/BaseClan.js'
import {ClanId} from '../types/clan.type.js'
import {LeaveData} from '../types/data.type.js'
import {RankUtils} from '../utils/rank.js'
import {CLAN_LEAVE_CANCEL, CLAN_LEAVE_CONFIRM} from './enums/CustomIds.enum.js'

export class Leave extends BaseClan {
	async run() {
		if (!this.isMember()) throw new ClanYouNotExistError(this.i)
		if (this.isOwner()) throw new ClanOwnerLeaveError(this.i)

		const member = RankUtils.checkMember(this.guildId, this.userId)
		const clanManager = ClanManager.findOne(member.clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:leave:send'))
		const data: LeaveData = {clanId: member.clanId}
		return this.confirm({
			embed, data,
			confirmId: CLAN_LEAVE_CONFIRM, cancelId: CLAN_LEAVE_CANCEL
		})
	}
	async accept(clanId: ClanId) {
		const clanManager = ClanManager.findOne(clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:leave:confirm', {user: this.user}))
		return this.i.editReply({embeds: [embed], components: []})
	}
}