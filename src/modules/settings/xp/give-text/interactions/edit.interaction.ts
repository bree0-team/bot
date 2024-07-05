import _ from 'lodash'
import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {XpGiveFromToError, XpGiveLessZeroError} from '../../errors/xp.error.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {TEXT_GIVE_MODAL, TEXT_GIVE_MODAL_VALUE_FROM, TEXT_GIVE_MODAL_VALUE_TO} from '../enums/CustomIds.enum.js'
import {GiveText} from '../GiveText.js'

class EditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const valueFrom = fields.getTextInputValue(TEXT_GIVE_MODAL_VALUE_FROM)
        const valueTo = fields.getTextInputValue(TEXT_GIVE_MODAL_VALUE_TO)
        const lengthFrom = _.toLength(valueFrom) as number
        const lengthTo = _.toLength(valueTo) as number
        if (lengthFrom < 0) throw new XpGiveLessZeroError(interaction)
        if (lengthFrom > lengthTo) throw new XpGiveFromToError(interaction)
        await SettingsXpManager.createOrUpdate(interaction.guildId, {textGive: [lengthFrom, lengthTo]})
        return new GiveText(interaction).run()
    }
}

export default new EditInteraction(TEXT_GIVE_MODAL)