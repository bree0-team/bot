import {RepliableInteraction} from 'discord.js'
import SettingsClanChannelRankAccessManager
    from '../../../settings/clan/channel/managers/settings-clan-channel-rank-access.manager.js'
import {AllChannelRights} from '../../../settings/clan/channel/types/rights.type.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import {ClanMemberModel} from '../../models/clan-member.model.js'
import {ClanCRAAccessError} from '../errors/clan-channel.error.js'

export const channelRankAccess = async (
    interaction: RepliableInteraction,
    right: AllChannelRights
): Promise<ClanMemberModel|undefined> => {
    const memberManager = ClanMemberManager.findOneByGuildId(interaction.guildId, interaction.user.id)
    const craManager = await SettingsClanChannelRankAccessManager
        .getOne(interaction.guildId)
    if (craManager[memberManager?.rank.toLowerCase()].includes(right)) return memberManager
    throw new ClanCRAAccessError(interaction)
}