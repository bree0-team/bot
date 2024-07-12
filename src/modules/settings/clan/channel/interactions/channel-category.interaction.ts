import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {ChannelId} from '../../../../../types/base.type.js'
import {RankAccessData} from '../../types/data.type.js'
import {Channel} from '../Channel.js'
import {CHANNEL_CATEGORY} from '../enums/CustomIds.enum.js'
import SettingsClanChannelManager from '../managers/settings-clan-channel.manager.js'

class ChannelCategoryInteraction extends PrivateHandler {
    protected async runValue(
        {interaction, value, data}: SelectOneValueHandlerOptions<ChannelId, RankAccessData>
    ) {
        const {rank} = data
        await SettingsClanChannelManager.createOrUpdate(interaction.guildId, {categoryId: value})
        return new Channel(interaction).run(rank)
    }
}

export default new ChannelCategoryInteraction(CHANNEL_CATEGORY)