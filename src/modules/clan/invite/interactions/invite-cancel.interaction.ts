import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {InviteData} from '../../types/data.type.js'
import {CLAN_INVITE_CANCEL} from '../enums/CustomIds.enum.js'
import {Invite} from '../Invite.js'

class InviteCancelInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<InviteData>) {
        const {clanId, userId} = data
        return new Invite(interaction).cancel(clanId, userId)
    }
}

export default new InviteCancelInteraction(CLAN_INVITE_CANCEL)