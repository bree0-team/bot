import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {ChannelId} from '../../../../../types/base.type.js'
import {Ad} from '../Ad.js'
import {AD_CHANNEL} from '../enums/CustomIds.enum.js'
import SettingsClanAdManager from '../managers/settings-clan-ad.manager.js'

class AdChannelInteraction extends PrivateHandler {
    protected async runValue({interaction, value}: SelectOneValueHandlerOptions<ChannelId>) {
        await SettingsClanAdManager.createOrUpdate(interaction.guildId, {channelId: value})
        return new Ad(interaction).run()
    }
}

export default new AdChannelInteraction(AD_CHANNEL)