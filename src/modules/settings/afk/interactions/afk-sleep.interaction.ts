import _ from 'lodash'
import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {Afk} from '../Afk.js'
import {defaultMaxSleep, defaultMinSleep} from '../constants/defaults.js'
import {AFK_SLEEP_EDIT_MODAL, AFK_SLEEP_EDIT_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {AfkSleepMinMaxError} from '../errors/afk.error.js'
import SettingsAfkManager from '../managers/settings-afk.manager.js'

class AfkSleepInteraction extends PrivateHandler {
    protected async runFields({interaction, fields}: ModalHandlerOptions) {
        const value = fields.getTextInputValue(AFK_SLEEP_EDIT_MODAL_VALUE)
        const sleep = _.toLength(value) as number
        if (defaultMinSleep > sleep || sleep > defaultMaxSleep) throw new AfkSleepMinMaxError(interaction)
        await SettingsAfkManager.createOrUpdate(interaction.guildId, {sleep})
        return new Afk(interaction).run()
    }
}

export default new AfkSleepInteraction(AFK_SLEEP_EDIT_MODAL)