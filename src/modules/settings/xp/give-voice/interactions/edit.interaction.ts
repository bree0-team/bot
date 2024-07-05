import _ from 'lodash'
import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {XpGiveFromToError, XpGiveLessZeroError} from '../../errors/xp.error.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {VOICE_GIVE_MODAL, VOICE_GIVE_MODAL_VALUE_FROM, VOICE_GIVE_MODAL_VALUE_TO} from '../enums/CustomIds.enum.js'
import {GiveVoice} from '../GiveVoice.js'

class EditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const valueFrom = fields.getTextInputValue(VOICE_GIVE_MODAL_VALUE_FROM)
        const valueTo = fields.getTextInputValue(VOICE_GIVE_MODAL_VALUE_TO)
        const lengthFrom = _.toLength(valueFrom) as number
        const lengthTo = _.toLength(valueTo) as number
        if (lengthFrom < 0) throw new XpGiveLessZeroError(interaction)
        if (lengthFrom > lengthTo) throw new XpGiveFromToError(interaction)
        await SettingsXpManager.createOrUpdate(interaction.guildId, {voiceGive: [lengthFrom, lengthTo]})
        return new GiveVoice(interaction).run()
    }
}

export default new EditInteraction(VOICE_GIVE_MODAL)