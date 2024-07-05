import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {MUN_CHANNEL} from '../enums/CustomIds.enum.js'
import SettingsMunManager from '../managers/settings-mun.manager.js'
import {Mun} from '../Mun.js'

class ChannelInteraction extends PrivateHandler {
    protected async runValue({interaction, value}: SelectOneValueHandlerOptions<ChannelId>) {
        await SettingsMunManager.createOrUpdate(interaction.guildId, {channelId: value})
        return new Mun(interaction).run()
    }
}

export default new ChannelInteraction(MUN_CHANNEL)