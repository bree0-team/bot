import {InteractionReplyOptions} from 'discord.js'
import {ClanAccessCommands} from '../../enums/ClanCommands.enum.js'
import {ClanCommandForRankError} from '../../errors/clan.error.js'
import {rankAccess} from '../../helpers/rankAccess.js'
import ClanManager from '../../managers/clan.manager.js'
import {BaseClan} from '../../structures/BaseClan.js'
import ClanRoleManager from '../managers/clan-role.manager.js'

export class New extends BaseClan {
	async run() {
		const name = this.getString('name');
		const owner = await rankAccess(this.i, ClanAccessCommands.ROLE_NEW)
		if (!owner) throw new ClanCommandForRankError(this.i)
		const clanManager = ClanManager.findOne(owner.clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:role:new', {user: this.user, name}))
		const replyData: InteractionReplyOptions = {embeds: [embed]}
		await this.reply({replyData})
		return ClanRoleManager.create(this.guildId, owner.clanId, {name})
	}
}