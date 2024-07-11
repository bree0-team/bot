import {bold, EmbedBuilder, GuildMember, InteractionReplyOptions, userMention, UserSelectMenuBuilder} from 'discord.js'
import {EmojiService} from 'emoji-library'
import {EmotesImages} from '../../../enums/EmotesImages.enum.js'
import {UnknownEmojiError} from '../../../errors/notfound.js'
import {EmbedField, GuildEmbed} from '../../../helpers/embed.js'
import {UserSelectRowBuilder} from '../../../services/interaction.js'
import {UserId} from '../../../types/base.type.js'
import {WhoManage} from '../../settings/clan/manage/enums/WhoManage.enum.js'
import SettingsClanManageManager from '../../settings/clan/manage/managers/settings-clan-manage.manager.js'
import {ClanMemberExistError, ClanRoleToCreateError, ClanYouExistError} from '../errors/clan.error.js'
import {createRoleAccess} from '../helpers/createRoleAccess.js'
import {BaseClan} from '../structures/BaseClan.js'
import {CreateData} from '../types/data.type.js'
import {CLAN_CREATE_CANCEL, CLAN_CREATE_CONFIRM, CLAN_CREATE_SELECT_USER} from './enums/CustomIds.enum.js'

interface EmbedDto {
	ownerId?: UserId
	description?: string
}

export class Create extends BaseClan {
	createEmbed(emoji: string, name: string, dto: EmbedDto): EmbedBuilder {
		const {ownerId, description} = dto
		const fields: EmbedField[] = [
			EmbedField(this.t('emoji'), emoji, true),
			EmbedField(this.t('name'), name, true)
		]
		if (ownerId) fields.push(EmbedField(this.t('clan:OWNER'), userMention(ownerId)))
		const embed = GuildEmbed(this.guildId)
			.setTitle(this.t('clan:create'))
			.addFields(fields)
			.setThumbnail(EmotesImages.SWORDSMAN)
		if (description) embed.setDescription(description)
		return embed
	}
	async run() {
		const emojiId = this.getString('emoji')
		const emojiArr = new EmojiService().getEmojiById(emojiId)
		const name = this.getString('name')
		if (!emojiArr || !emojiArr.length) throw new UnknownEmojiError(this.i)
		const emoji = emojiArr[0].symbol
		const createManager = await SettingsClanManageManager.getOne(this.guildId)
		if (!createManager.roles.length && createManager.who === WhoManage.MEMBER) return this.members(emoji, name)
		if (!createRoleAccess(this.i.member as GuildMember, createManager.roles)) throw new ClanRoleToCreateError(this.i)
		if (createManager.who === WhoManage.MEMBER) return this.members(emoji, name)
		else return this.roles(emoji, name)
	}
	async members(emoji: string, name: string, ownerId?: UserId) {
		if (this.isMember(ownerId ?? this.userId)) throw (
			ownerId ? new ClanMemberExistError(this.i, userMention(ownerId)) : new ClanYouExistError(this.i)
		)
		const data: CreateData = {emoji, name, ownerId}
		return this.confirm({
			embed: this.createEmbed(emoji, name, {ownerId}), data,
			confirmId: CLAN_CREATE_CONFIRM, cancelId: CLAN_CREATE_CANCEL
		})
	}
	async roles(emoji: string, name: string) {
		const select = new UserSelectMenuBuilder()
			.setCustomId(CLAN_CREATE_SELECT_USER)
			.setPlaceholder(this.t('select:user'))
		const row = UserSelectRowBuilder(select)
		const embed = this.createEmbed(emoji, name, {
			description: bold(this.t('clan:create_for_user'))
		})
		const replyData: InteractionReplyOptions = {embeds: [embed], components: [row]}
		const data: CreateData = {emoji, name}
		return this.reply({replyData, data})
	}
}