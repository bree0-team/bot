import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {VoiceStates} from '../../enums/VoiceStates.enum.js'
import {Activity} from '../Activity.js'
import {ACTIVITY_VOICE_STATES} from '../enums/CustomIds.enum.js'
import SettingsActivityManager from '../managers/settings-activity.manager.js'

class VoiceStatesInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<VoiceStates>) {
        await SettingsActivityManager.createOrUpdate(interaction.guildId, {voiceStates: values})
        return new Activity(interaction).run()
    }
}

export default new VoiceStatesInteraction(ACTIVITY_VOICE_STATES)