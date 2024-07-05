import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {Afk} from '../Afk.js'
import {AFK_CHANNELS_SELECT} from '../enums/CustomIds.enum.js'
import SettingsAfkManager from '../managers/settings-afk.manager.js'

class AfkChannelsInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<ChannelId>) {
        await SettingsAfkManager.createOrUpdate(interaction.guildId, {channels: values})
        return new Afk(interaction).run()
    }
}

export default new AfkChannelsInteraction(AFK_CHANNELS_SELECT)