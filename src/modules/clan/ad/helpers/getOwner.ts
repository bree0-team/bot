import {RepliableInteraction} from 'discord.js'
import {UserId} from '../../../../types/base.type.js'
import {ClanCommandForRankError} from '../../errors/clan.error.js'
import ClanManager from '../../managers/clan.manager.js'
import {ClanMemberModel} from '../../models/clan-member.model.js'
import {ClanModel} from '../../models/clan.model.js'
import {RankUtils} from '../../utils/rank.js'

interface OwnerObject {
    clan: ClanModel,
    owner: ClanMemberModel
}

export function getOwner(
    interaction: RepliableInteraction,
    userId: UserId = interaction.user.id
): OwnerObject | never {
    if (!RankUtils.isOwner(interaction.guildId, userId)) throw new ClanCommandForRankError(interaction)
    const owner = RankUtils.checkMember(interaction.guildId, userId)
    const clan = ClanManager.findOne(owner.clanId)
    return {owner, clan}
}