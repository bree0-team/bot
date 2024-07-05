import {userMention} from 'discord.js'
import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {UserRight} from '../../channel/user-rights/enums/UserRight.enum.js'
import {RightsUtils} from '../../channel/utils/rights.js'
import {ClanMemberExistError} from '../../errors/clan.error.js'
import {limitInvite} from '../../helpers/limitInvite.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import ClanRoleManager from '../../role/managers/clan-role.manager.js'
import {InviteData} from '../../types/data.type.js'
import {RankUtils} from '../../utils/rank.js'
import {CLAN_INVITE_CONFIRM} from '../enums/CustomIds.enum.js'
import {Invite} from '../Invite.js'

class InviteConfirmInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<InviteData>) {
        const {clanId, userId} = data
        if (RankUtils.checkMember(interaction.guildId, userId))
            throw new ClanMemberExistError(interaction, userMention(userId))
        await limitInvite(interaction, clanId)
        const defRole = ClanRoleManager.findOneDefault(clanId)
        await ClanMemberManager.create(interaction.guildId, clanId, {userId, clanRoleId: defRole.id})
        RightsUtils.addUsersToAllChannels(interaction.guild, clanId, [userId], UserRight.clanMember)
        return new Invite(interaction).accept(clanId, userId)
    }
}

export default new InviteConfirmInteraction(CLAN_INVITE_CONFIRM)