import {RepliableInteraction} from 'discord.js'
import SettingsClanManager from '../../settings/clan/managers/settings-clan.manager.js'
import {ClanInviteLimitError} from '../errors/clan.error.js'
import ClanMemberManager from '../managers/clan-member.manager.js'
import {ClanId} from '../types/clan.type.js'

export const limitInvite = async (interaction: RepliableInteraction, clanId: ClanId): Promise<void> => {
    const clanManager = await SettingsClanManager.getOne(interaction.guildId)
    const memberManager = ClanMemberManager.findAllByClanId(clanId)
    if (clanManager.member_limit !== null && clanManager.member_limit <= memberManager.size)
        throw new ClanInviteLimitError(interaction)
}