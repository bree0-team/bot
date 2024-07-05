import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {RightsUtils} from '../../channel/utils/rights.js'
import {ClanOwnerLeaveError} from '../../errors/clan.error.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import {LeaveData} from '../../types/data.type.js'
import {RankUtils} from '../../utils/rank.js'
import {CLAN_LEAVE_CONFIRM} from '../enums/CustomIds.enum.js'
import {Leave} from '../Leave.js'

class LeaveInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<LeaveData>) {
        if (RankUtils.isOwner(interaction.guildId, interaction.user.id)) throw new ClanOwnerLeaveError(interaction)
        const {clanId} = data
        await ClanMemberManager.remove(clanId, interaction.user.id)
        RightsUtils.removeUsersFromAllChannels(interaction.guild, clanId, [interaction.user.id])
        return new Leave(interaction).accept(clanId)
    }
}

export default new LeaveInteraction(CLAN_LEAVE_CONFIRM)