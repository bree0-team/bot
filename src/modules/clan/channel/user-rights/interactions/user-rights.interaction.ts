import {ButtonHandlerOptions, PublicHandler} from '../../../../../handlers/interaction.js'
import {ClanChannelButtonCustomIds} from '../../enums/CustomIds.enum.js'
import {SelectChannel} from '../../SelectChannel.js'
import {CLAN_CHANNEL_UR_SELECT} from '../enums/CustomIds.enum.js'

class UserRightsInteraction extends PublicHandler {
    protected run = ({interaction}: ButtonHandlerOptions) => new SelectChannel(interaction)
        .run(CLAN_CHANNEL_UR_SELECT)
}

export default new UserRightsInteraction(ClanChannelButtonCustomIds.UserRights)