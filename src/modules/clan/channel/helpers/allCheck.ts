import {CategoryChannel, RepliableInteraction} from 'discord.js'
import {UnknownChannelError} from '../../../../errors/notfound.js'
import SettingsClanChannelManager from '../../../settings/clan/channel/managers/settings-clan-channel.manager.js'
import {AllChannelRights} from '../../../settings/clan/channel/types/rights.type.js'
import {ClanYouNotExistError} from '../../errors/clan.error.js'
import ClanManager from '../../managers/clan.manager.js'
import {ClanMemberModel} from '../../models/clan-member.model.js'
import {ClanModel} from '../../models/clan.model.js'
import {RankUtils} from '../../utils/rank.js'
import {ClanChannelMissingCategoryError} from '../errors/clan-channel.error.js'
import {channelRankAccess} from './channelRankAccess.js'

interface AllCheckReturn {
    clan: ClanModel,
    member: ClanMemberModel
    category: CategoryChannel
}

export const allCheck = async (interaction: RepliableInteraction): Promise<AllCheckReturn | never> => {
    if (!RankUtils.checkMember(interaction.guildId, interaction.user.id)) throw new ClanYouNotExistError(interaction)
    const member = await channelRankAccess(interaction, AllChannelRights.voiceChannel)
    const channelManager = await SettingsClanChannelManager.getOne(interaction.guildId)
    if (!channelManager.categoryId) throw new ClanChannelMissingCategoryError(interaction)
    const category = interaction.guild.channels.resolve(channelManager.categoryId) as CategoryChannel
    if (!category) throw new UnknownChannelError(interaction)
    const clan = ClanManager.findOne(member.clanId)
    return {clan, member, category}
}