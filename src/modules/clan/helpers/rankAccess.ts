import {RepliableInteraction} from 'discord.js'
import SettingsClanCommandRankAccessManager
    from '../../settings/clan/command-rank-access/managers/settings-clan-command-rank-access.manager.js'
import {ClanAccessCommands} from '../enums/ClanCommands.enum.js'
import {ClanCommandForRankError} from '../errors/clan.error.js'
import ClanMemberManager from '../managers/clan-member.manager.js'
import {ClanMemberModel} from '../models/clan-member.model.js'

export const rankAccess = async (
    interaction: RepliableInteraction,
    command: ClanAccessCommands,
    doThrow: boolean = true
): Promise<ClanMemberModel|never|undefined> => {
    const memberManager = ClanMemberManager.findOneByGuildId(interaction.guildId, interaction.user.id)
    const craManager = await SettingsClanCommandRankAccessManager
        .getOne(interaction.guildId)
    if (craManager[memberManager?.rank.toLowerCase()]?.includes(command)) return memberManager
    if (doThrow) throw new ClanCommandForRankError(interaction)
}