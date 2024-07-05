import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {ChannelRankAccessData} from '../../types/data.type.js'
import {Channel} from '../Channel.js'
import {CHANNEL_RIGHTS} from '../enums/CustomIds.enum.js'
import SettingsClanChannelRankAccessManager from '../managers/settings-clan-channel-rank-access.manager.js'
import {AllChannelAccess} from '../types/rights.type.js'

class ChannelRightsInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<AllChannelAccess, ChannelRankAccessData>
    ) {
        const {rank} = data
        if (!rank) return;
        await SettingsClanChannelRankAccessManager.createOrUpdate(interaction.guildId, {[rank]: values})
        return new Channel(interaction).run(rank, values)
    }
}

export default new ChannelRightsInteraction(CHANNEL_RIGHTS)