import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {ClanRank} from '../../../../clan/enums/ClanRank.enum.js'
import {RankAccessData} from '../../types/data.type.js'
import {Channel} from '../Channel.js'
import {CHANNEL_RANK} from '../enums/CustomIds.enum.js'

class ChannelRankInteraction extends PrivateHandler {
    protected runValue = (
        {interaction, value}: SelectOneValueHandlerOptions<ClanRank, RankAccessData>
    ) => new Channel(interaction).run(value)
}

export default new ChannelRankInteraction(CHANNEL_RANK)