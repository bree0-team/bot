import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {ClanRank} from '../../enums/ClanRank.enum.js'
import {ClanCommandForRankError} from '../../errors/clan.error.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import {TransferData} from '../../types/data.type.js'
import {RankUtils} from '../../utils/rank.js'
import {CLAN_TRANSFER_CONFIRM} from '../enums/CustomIds.enums.js'
import {Transfer} from '../Transfer.js'

class TransferConfirmInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<TransferData>) {
        if (!RankUtils.isOwner(interaction.guildId, interaction.user.id)) throw new ClanCommandForRankError(interaction)
        const {clanId, userId} = data
        await ClanMemberManager.update(clanId, userId, {rank: ClanRank.OWNER})
        await ClanMemberManager.update(clanId, interaction.user.id, {rank: ClanRank.MEMBER})
        return new Transfer(interaction).accept(clanId, userId)
    }
}

export default new TransferConfirmInteraction(CLAN_TRANSFER_CONFIRM)