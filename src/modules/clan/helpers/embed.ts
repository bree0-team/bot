import {EmbedBuilder} from 'discord.js'
import {GuildEmbed} from '../../../helpers/embed.js'
import SettingsClanAppearanceManager from '../../settings/clan/appearance/managers/settings-clan-appearance.manager.js'
import {ClanModel} from '../models/clan.model.js'
import {NamePatternUtils} from '../utils/name-pattern.js'

export function clanEmbed(clan?: ClanModel): EmbedBuilder {
    const appearanceManager = SettingsClanAppearanceManager.findOne(clan?.guildId)
    const embed = GuildEmbed(clan?.guildId)
    if (appearanceManager?.color && clan?.color) embed.setColor(clan?.color)
    if (appearanceManager?.avatar && clan?.avatar) embed.setThumbnail(clan?.avatar)
    if (appearanceManager?.banner && clan?.banner) embed.setImage(clan?.banner)
    return embed
}

export const clanTitleEmbed = async (clan: ClanModel, title: string): Promise<EmbedBuilder> => clanEmbed(clan)
    .setTitle(title + ': ' + await NamePatternUtils.getPattern(clan))