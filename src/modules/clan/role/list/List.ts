import {Collection, InteractionReplyOptions} from 'discord.js'
import {ClanRankEmoji} from '../../../../enums/ClanRankEmoji.enum.js'
import {EmotesImages} from '../../../../enums/EmotesImages.enum.js'
import {ClanAccessCommands} from '../../enums/ClanCommands.enum.js'
import {ClanYouNotExistError} from '../../errors/clan.error.js'
import {rankAccess} from '../../helpers/rankAccess.js'
import {sortedRoles} from '../../helpers/sortedRoles.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import ClanManager from '../../managers/clan.manager.js'
import {BaseClan} from '../../structures/BaseClan.js'
import {ClanRoleId} from '../../types/clan.type.js'
import {NamePatternUtils} from '../../utils/name-pattern.js'
import {ClanRoleModel} from '../models/clan-role.model.js'

export class List extends BaseClan {
	#finalRoles = (roles: Collection<ClanRoleId, ClanRoleModel>): string[] => roles.map(role => {
		const memberManager = ClanMemberManager.findAll()
			.filter(i => i.clanId === role.clanId && i.clanRoleId === role.id)
		return `\`${ role.name }\` — ${ memberManager.size } ${ ClanRankEmoji.MEMBER }\n`;
	})

	async run() {
		const member = await rankAccess(this.i, ClanAccessCommands.ROLE_LIST, false)
		if (!member) throw new ClanYouNotExistError(this.i)

		const roles = sortedRoles(member.clanId)
		const finalRoles = this.#finalRoles(roles)
		const clanManager = ClanManager.findOne(member.clanId)
		const embed = this.clanEmbed(clanManager)
			.setTitle(this.t('clan:role:list', {
				name: await NamePatternUtils.getPattern(clanManager)
			}))
			.setDescription(finalRoles.join('\n'))
			.setThumbnail(EmotesImages.LIST)
		const replyData: InteractionReplyOptions = {embeds: [embed]}
		return this.reply({replyData})
	}
}