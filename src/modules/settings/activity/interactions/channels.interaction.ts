import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {Activity} from '../Activity.js'
import {ACTIVITY_CHANNELS} from '../enums/CustomIds.enum.js'
import SettingsActivityManager from '../managers/settings-activity.manager.js'

class ChannelsInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<ChannelId>) {
        await SettingsActivityManager.createOrUpdate(interaction.guildId, {channels: values})
        return new Activity(interaction).run()
    }
}

export default new ChannelsInteraction(ACTIVITY_CHANNELS)