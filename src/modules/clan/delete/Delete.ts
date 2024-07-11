import {
	EmbedBuilder,
	GuildMember,
	InteractionReplyOptions,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	userMention
} from 'discord.js'
import {EmotesImages} from '../../../enums/EmotesImages.enum.js'
import {EmbedField, GuildEmbed} from '../../../helpers/embed.js'
import {InteractionReplyComponent, StringEmptyOption, StringSelectRowBuilder} from '../../../services/interaction.js'
import {UserId} from '../../../types/base.type.js'
import {WhoManage} from '../../settings/clan/manage/enums/WhoManage.enum.js'
import SettingsClanManageManager from '../../settings/clan/manage/managers/settings-clan-manage.manager.js'
import {ClanRank} from '../enums/ClanRank.enum.js'
import {ClanCommandForRankError, ClanRoleToCreateError} from '../errors/clan.error.js'
import {createRoleAccess} from '../helpers/createRoleAccess.js'
import ClanMemberManager from '../managers/clan-member.manager.js'
import ClanManager from '../managers/clan.manager.js'
import {BaseClan} from '../structures/BaseClan.js'
import {ClanId} from '../types/clan.type.js'
import {DeleteData} from '../types/data.type.js'
import {NamePatternUtils} from '../utils/name-pattern.js'
import {DELETE_CANCEL, DELETE_CONFIRM, DELETE_SELECT_CLAN} from './enums/CustomIds.enum.js'

export class Delete extends BaseClan {
	private async deleteEmbed(clanId: ClanId, ownerId?: UserId): Promise<EmbedBuilder> {
		const clanManager = ClanManager.findOne(clanId)
		const embed = (await this.clanTitleEmbed(clanManager))
			.setDescription(this.t('clan:delete:description'))
			.setThumbnail(EmotesImages.SWORDSMAN)
		if (ownerId) embed.addFields(EmbedField(this.t('clan:OWNER'), userMention(ownerId)))
		return embed
	}
	async run() {
		const manageManager = await SettingsClanManageManager.getOne(this.guildId)
		if (manageManager.who === WhoManage.MEMBER) return this.members()
		if (!createRoleAccess(this.i.member as GuildMember, manageManager.roles)) throw new ClanRoleToCreateError(this.i)
		return this.roles()
	}
	async members(clanId?: ClanId) {
		let withOwner: boolean = true
		if (!clanId) {
			const member = ClanMemberManager.findOneByGuildId(this.guildId, this.userId)
			if (!member || member.rank !== ClanRank.OWNER) throw new ClanCommandForRankError(this.i)
			clanId = member.clanId
			withOwner = false
		}
		const clanOwner = ClanMemberManager.findAllByClanId(clanId)
			.find(i => i.rank === ClanRank.OWNER)
		const data: DeleteData = {clanId, ownerId: clanOwner.userId}
		return this.confirm({
			embed: await this.deleteEmbed(clanId, withOwner ? clanOwner.userId : undefined), data,
			confirmId: DELETE_CONFIRM, cancelId: DELETE_CANCEL
		})
	}
	async roles() {
		const clans = ClanManager.findAllByGuildId(this.guildId)
		const select = new StringSelectMenuBuilder({
			customId: DELETE_SELECT_CLAN,
			placeholder: this.t('clan:select')
		}).setOptions(await Promise.all(clans.map(async i => new StringSelectMenuOptionBuilder({
			label: await NamePatternUtils.getPattern(i),
			value: i.id.toString()
		}))))
		if (!select.options.length) select.setDisabled(true).setOptions(StringEmptyOption)
		const components: InteractionReplyComponent[] = [StringSelectRowBuilder(select)]
		const embed = GuildEmbed(this.guildId, {
			description: this.t('clan:delete:select_description')
		})
		const replyData: InteractionReplyOptions = {embeds: [embed], components}
		return this.reply({replyData})
	}
}