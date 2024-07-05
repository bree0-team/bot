import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {RightsUtils} from '../../channel/utils/rights.js'
import {ClanAccessCommands} from '../../enums/ClanCommands.enum.js'
import {rankAccess} from '../../helpers/rankAccess.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import {KickData} from '../../types/data.type.js'
import {CLAN_KICK_CONFIRM} from '../enums/CustomIds.enum.js'
import {Kick} from '../Kick.js'

class KickInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<KickData>) {
        await rankAccess(interaction, ClanAccessCommands.KICK)
        const {clanId, userId} = data
        await ClanMemberManager.remove(clanId, userId)
        RightsUtils.removeUsersFromAllChannels(interaction.guild, clanId, [userId])
        return new Kick(interaction).accept(clanId, userId)
    }
}

export default new KickInteraction(CLAN_KICK_CONFIRM)