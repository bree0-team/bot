import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {VoiceStates} from '../../../enums/VoiceStates.enum.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {XP_VOICE_STATES} from '../enums/CustomIds.enum.js'
import {TextVoice} from '../TextVoice.js'

class VoiceStatesInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<VoiceStates>) {
        await SettingsXpManager.createOrUpdate(interaction.guildId, {voiceStates: values})
        return new TextVoice(interaction).run()
    }
}

export default new VoiceStatesInteraction(XP_VOICE_STATES)