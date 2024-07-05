import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {ChannelId} from '../../../../../types/base.type.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {XP_CHANNELS} from '../enums/CustomIds.enum.js'
import {Ignored} from '../Ignored.js'

class ChannelsInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<ChannelId>) {
        await SettingsXpManager.createOrUpdate(interaction.guildId, {channels: values})
        return new Ignored(interaction).run()
    }
}

export default new ChannelsInteraction(XP_CHANNELS)