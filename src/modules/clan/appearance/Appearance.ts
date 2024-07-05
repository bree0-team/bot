import {ButtonBuilder, ButtonStyle, InteractionReplyOptions} from 'discord.js'
import _ from 'lodash'
import {ButtonRowBuilder} from '../../../services/interaction.js'
import SettingsClanAppearanceManager from '../../settings/clan/appearance/managers/settings-clan-appearance.manager.js'
import {ClanCommandForRankError} from '../errors/clan.error.js'
import ClanManager from '../managers/clan.manager.js'
import {BaseClan} from '../structures/BaseClan.js'
import {AppearanceData} from '../types/data.type.js'
import {RankUtils} from '../utils/rank.js'
import {ClanAppearanceButtonCustomIds} from './enums/CustomIds.enum.js'
import {ClanAppearanceDisabledError} from './errors/clan-appearance.error.js'

export class Appearance extends BaseClan {
    async run() {
        if (!this.isOwner()) throw new ClanCommandForRankError(this.i)

        const appearanceManager = await SettingsClanAppearanceManager.findOne(this.guildId)
        if (!(_.some([
            appearanceManager.color,
            appearanceManager.description,
            appearanceManager.avatar,
            appearanceManager.banner,
        ]))) throw new ClanAppearanceDisabledError(this.i)

        const owner = RankUtils.checkMember(this.guildId, this.userId)
        const clan = ClanManager.findOne(owner.clanId)
        const embed = await this.clanTitleEmbed(clan)

        if (appearanceManager.description && clan.description) embed.setDescription(clan.description)

        const colorButton = new ButtonBuilder()
            .setCustomId(ClanAppearanceButtonCustomIds.ColorModal)
            .setLabel(this.t('clan:appearance:options:color'))
            .setStyle(ButtonStyle.Primary)
        const descriptionButton = new ButtonBuilder()
            .setCustomId(ClanAppearanceButtonCustomIds.DescriptionModal)
            .setLabel(this.t('clan:appearance:options:description'))
            .setStyle(ButtonStyle.Primary)
        const avatarButton = new ButtonBuilder()
            .setCustomId(ClanAppearanceButtonCustomIds.AvatarModal)
            .setLabel(this.t('clan:appearance:options:avatar'))
            .setStyle(ButtonStyle.Primary)
        const bannerButton = new ButtonBuilder()
            .setCustomId(ClanAppearanceButtonCustomIds.BannerModal)
            .setLabel(this.t('clan:appearance:options:banner'))
            .setStyle(ButtonStyle.Primary)
        const buttons: ButtonBuilder[] = []
        if (appearanceManager.color) buttons.push(colorButton)
        if (appearanceManager.description) buttons.push(descriptionButton)
        if (appearanceManager.avatar) buttons.push(avatarButton)
        if (appearanceManager.banner) buttons.push(bannerButton)
        const row = ButtonRowBuilder(...buttons)
        const replyData: InteractionReplyOptions = {embeds: [embed], components: [row]}
        const data: AppearanceData = {clanId: owner.clanId}
        return this.reply({replyData, data})
    }
}