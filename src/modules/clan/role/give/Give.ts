import {InteractionReplyOptions} from 'discord.js'
import {ClanAccessCommands} from '../../enums/ClanCommands.enum.js'
import {ClanCommandForRankError, ClanMemberNotExistError, ClanRoleNotExistError} from '../../errors/clan.error.js'
import {rankAccess} from '../../helpers/rankAccess.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import ClanManager from '../../managers/clan.manager.js'
import {BaseClan} from '../../structures/BaseClan.js'
import ClanRoleManager from '../managers/clan-role.manager.js'

export class Give extends BaseClan {
	async run() {
		const user = this.getUser('user')
		const role = this.getString('role')
		const chief = await rankAccess(this.i, ClanAccessCommands.ROLE_GIVE)

		if (!chief) throw new ClanCommandForRankError(this.i)

		const memberManager = ClanMemberManager.findOne(chief.clanId, user.id)
		if (!memberManager) throw new ClanMemberNotExistError(this.i, user.toString())

		const roleManager = ClanRoleManager.findOne(Number(role))
		if (!roleManager || roleManager.clanId !== chief.clanId) throw new ClanRoleNotExistError(this.i)

		const clanManager = ClanManager.findOne(chief.clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:role:give', {author: this.user, user, role: roleManager.name}))
		const replyData: InteractionReplyOptions = {embeds: [embed]}
		await this.reply({replyData})
		return ClanMemberManager.update(chief.clanId, user.id, {clanRoleId: Number(role)})
	}
}