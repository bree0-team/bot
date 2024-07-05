import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {Afk} from '../Afk.js'
import {defaultSleep} from '../constants/defaults.js'
import {AFK_SLEEP_RESET} from '../enums/CustomIds.enum.js'
import SettingsAfkManager from '../managers/settings-afk.manager.js'

class AfkSleepResetInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        await SettingsAfkManager.createOrUpdate(interaction.guildId, {sleep: defaultSleep})
        return new Afk(interaction).run()
    }
}

export default new AfkSleepResetInteraction(AFK_SLEEP_RESET)