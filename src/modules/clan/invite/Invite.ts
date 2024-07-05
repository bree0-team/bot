import {GuildMember, userMention} from 'discord.js'
import {UnknownMemberError} from '../../../errors/notfound.js'
import {UserId} from '../../../types/base.type.js'
import {ClanAccessCommands} from '../enums/ClanCommands.enum.js'
import {ClanMemberExistError} from '../errors/clan.error.js'
import {limitInvite} from '../helpers/limitInvite.js'
import {rankAccess} from '../helpers/rankAccess.js'
import ClanManager from '../managers/clan.manager.js'
import {BaseClan} from '../structures/BaseClan.js'
import {ClanId} from '../types/clan.type.js'
import {InviteData} from '../types/data.type.js'
import {CLAN_INVITE_CANCEL, CLAN_INVITE_CONFIRM} from './enums/CustomIds.enum.js'

export class Invite extends BaseClan {
	async run() {
		const member = this.getMember('user')
		const recruiter = await rankAccess(this.i, ClanAccessCommands.INVITE)

		if (!(member instanceof GuildMember)) throw new UnknownMemberError(this.i)
		if (this.isMember(member.id)) throw new ClanMemberExistError(this.i, member.toString())
		await limitInvite(this.i, recruiter.clanId)

		const clanManager = ClanManager.findOne(recruiter.clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:invite:send', {user: member, author: this.user}))
		const data: InviteData = {clanId: recruiter.clanId, userId: member.id}
		return this.confirm({
			userId: member.id, embed, data,
			confirmId: CLAN_INVITE_CONFIRM, cancelId: CLAN_INVITE_CANCEL
		})
	}
	async accept(clanId: ClanId, userId: UserId) {
		const clanManager = ClanManager.findOne(clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:invite:accept', {user: userMention(userId)}))
		return this.i.editReply({embeds: [embed], components: []})
	}
	async cancel(clanId: ClanId, userId: UserId) {
		const clanManager = ClanManager.findOne(clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:invite:reject', {user: userMention(userId)}))
		return this.i.editReply({embeds: [embed], components: []})
	}
}