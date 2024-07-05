import {PublicHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {ChannelUserRightsData} from '../../types/data.type.js'
import {CLAN_CHANNEL_UR_RIGHT_SELECT} from '../enums/CustomIds.enum.js'
import {UserRight} from '../enums/UserRight.enum.js'
import {UserRights} from '../UserRights.js'

class UserRightsRightInteraction extends PublicHandler {
    protected runValue({interaction, value, data}: SelectOneValueHandlerOptions<UserRight, ChannelUserRightsData>) {
        const {channels} = data
        return new UserRights(interaction).run(channels, value)
    }
}

export default new UserRightsRightInteraction(CLAN_CHANNEL_UR_RIGHT_SELECT)