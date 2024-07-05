import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {Afk} from '../Afk.js'
import {AFK_SWITCH} from '../enums/CustomIds.enum.js'
import SettingsAfkManager from '../managers/settings-afk.manager.js'

class AfkSwitchInteraction extends PrivateHandler {
    protected async run({interaction}: ButtonHandlerOptions) {
        const afkManager = await SettingsAfkManager.getOne(interaction.guildId)
        await SettingsAfkManager.createOrUpdate(interaction.guildId, {value: !afkManager.value})
        return new Afk(interaction).run()
    }
}

export default new AfkSwitchInteraction(AFK_SWITCH)