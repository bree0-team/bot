import {GuildMember, userMention} from 'discord.js'
import {UnknownMemberError} from '../../../errors/notfound.js'
import {UserId} from '../../../types/base.type.js'
import SettingsClanManager from '../../settings/clan/managers/settings-clan.manager.js'
import {
	ClanCommandForRankError,
	ClanMemberNotExistError,
	ClanTransferDisabledError,
	ClanTransferYourselfError
} from '../errors/clan.error.js'
import ClanMemberManager from '../managers/clan-member.manager.js'
import ClanManager from '../managers/clan.manager.js'
import {BaseClan} from '../structures/BaseClan.js'
import {ClanId} from '../types/clan.type.js'
import {TransferData} from '../types/data.type.js'
import {NamePatternUtils} from '../utils/name-pattern.js'
import {RankUtils} from '../utils/rank.js'
import {CLAN_TRANSFER_CANCEL, CLAN_TRANSFER_CONFIRM} from './enums/CustomIds.enums.js'

export class Transfer extends BaseClan {
	async run() {
		if (!this.isOwner()) throw new ClanCommandForRankError(this.i)

		const user = this.getMember('user')
		if (!(user instanceof GuildMember)) throw new UnknownMemberError(this.i)

		const settingsClanManager = await SettingsClanManager.findOne(this.guildId)
		if (!settingsClanManager.transfer) throw new ClanTransferDisabledError(this.i)
		if (this.userId === user.id) throw new ClanTransferYourselfError(this.i)

		const member = RankUtils.checkMember(this.guildId, this.userId)
		const memberManager = ClanMemberManager.findOne(member.clanId, user.id)
		if (!memberManager) throw new ClanMemberNotExistError(this.i, user.toString())

		const clanManager = ClanManager.findOne(member.clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:transfer:alert', {
				name: await NamePatternUtils.getPattern(clanManager), user
			}))
		const data: TransferData = {clanId: member.clanId, userId: user.id}
		return this.confirm({
			embed, data,
			confirmId: CLAN_TRANSFER_CONFIRM, cancelId: CLAN_TRANSFER_CANCEL
		})
	}
	async accept(clanId: ClanId, userId: UserId) {
		const clanManager = ClanManager.findOne(clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:transfer:confirm', {
				author: this.user, user: userMention(userId)
			}))
		return this.i.editReply({embeds: [embed], components: []})
	}
}