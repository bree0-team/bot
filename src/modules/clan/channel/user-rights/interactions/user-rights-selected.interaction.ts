import {PublicHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {ChannelId} from '../../../../../types/base.type.js'
import {CLAN_CHANNEL_UR_SELECT} from '../enums/CustomIds.enum.js'
import {UserRights} from '../UserRights.js'

class UserRightsSelectedInteraction extends PublicHandler {
    protected runValues = ({interaction, values}: SelectManyValuesHandlerOptions<ChannelId>) =>
        new UserRights(interaction).run(values)
}

export default new UserRightsSelectedInteraction(CLAN_CHANNEL_UR_SELECT)