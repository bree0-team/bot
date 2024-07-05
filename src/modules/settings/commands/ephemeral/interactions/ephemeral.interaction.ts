import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsCommandsManager from '../../managers/settings-commands.manager.js'
import {CommandData} from '../../types/data.type.js'
import {EPHEMERAL_SWITCH} from '../enums/CustomIds.enum.js'
import {Ephemeral} from '../Ephemeral.js'

class EphemeralInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<CommandData>) {
        const {command} = data
        const {ephemeral} = await SettingsCommandsManager.getOne(interaction.guildId, command)
        await SettingsCommandsManager.createOrUpdate(interaction.guildId, command, {ephemeral: !ephemeral})
        return new Ephemeral(interaction).run(command)
    }
}

export default new EphemeralInteraction(EPHEMERAL_SWITCH)