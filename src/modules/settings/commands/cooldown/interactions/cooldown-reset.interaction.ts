import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {defaultCooldown} from '../../constants/defaults.js'
import SettingsCommandsManager from '../../managers/settings-commands.manager.js'
import {CommandData} from '../../types/data.type.js'
import {Cooldown} from '../Cooldown.js'
import {COOLDOWN_RESET} from '../enums/CustomIds.enum.js'

class CooldownResetInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<CommandData>) {
        const {command} = data
        await SettingsCommandsManager.createOrUpdate(interaction.guildId, command, {cooldown: defaultCooldown})
        return new Cooldown(interaction).run(command)
    }
}

export default new CooldownResetInteraction(COOLDOWN_RESET)