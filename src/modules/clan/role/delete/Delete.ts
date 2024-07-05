import {InteractionReplyOptions} from 'discord.js'
import {ClanAccessCommands} from '../../enums/ClanCommands.enum.js'
import {ClanDeleteSystemRoleError, ClanRoleNotExistError} from '../../errors/clan.error.js'
import {rankAccess} from '../../helpers/rankAccess.js'
import ClanManager from '../../managers/clan.manager.js'
import {BaseClan} from '../../structures/BaseClan.js'
import ClanRoleManager from '../managers/clan-role.manager.js'

export class Delete extends BaseClan {
	async run() {
		const role = this.getString('role')
		const owner = await rankAccess(this.i, ClanAccessCommands.ROLE_DELETE)

		const roleManager = ClanRoleManager.findOne(Number(role))
		if (!roleManager || roleManager.clanId !== owner.clanId) throw new ClanRoleNotExistError(this.i)
		if (roleManager.isDefault) throw new ClanDeleteSystemRoleError(this.i)

		const clanManager = ClanManager.findOne(owner.clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:role:delete', {user: this.user, role: roleManager.name}))
		const replyData: InteractionReplyOptions = {embeds: [embed]}
		await this.reply({replyData})
		return ClanRoleManager.remove(owner.clanId, Number(role))
	}
}