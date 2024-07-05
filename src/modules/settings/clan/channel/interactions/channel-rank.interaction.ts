import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {ClanRank} from '../../../../clan/enums/ClanRank.enum.js'
import {ChannelRankAccessData} from '../../types/data.type.js'
import {Channel} from '../Channel.js'
import {CHANNEL_RANK} from '../enums/CustomIds.enum.js'
import SettingsClanChannelRankAccessManager from '../managers/settings-clan-channel-rank-access.manager.js'

class ChannelRankInteraction extends PrivateHandler {
    protected async runValue(
        {interaction, value}: SelectOneValueHandlerOptions<ClanRank, ChannelRankAccessData>
    ) {
        const craManager = await SettingsClanChannelRankAccessManager
            .getOne(interaction.guildId)
        return new Channel(interaction).run(value, craManager[value])
    }
}

export default new ChannelRankInteraction(CHANNEL_RANK)