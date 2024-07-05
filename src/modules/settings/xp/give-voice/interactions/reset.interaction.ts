import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {defaultTextGive} from '../../constants/defaults.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {VOICE_GIVE_RESET} from '../enums/CustomIds.enum.js'
import {GiveVoice} from '../GiveVoice.js'

class ResetInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await SettingsXpManager.createOrUpdate(interaction.guildId, {voiceGive: defaultTextGive})
        return new GiveVoice(interaction).run()
    }
}

export default new ResetInteraction(VOICE_GIVE_RESET)