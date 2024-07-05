import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsCommandsManager from '../../managers/settings-commands.manager.js'
import {CommandData} from '../../types/data.type.js'
import {USAGE_SWITCH} from '../enums/CustomIds.enum.js'
import {Usage} from '../Usage.js'

class UsageInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<CommandData>) {
        const {command} = data
        const {usage} = await SettingsCommandsManager.getOne(interaction.guildId, command)
        await SettingsCommandsManager.createOrUpdate(interaction.guildId, command, {usage: !usage})
        return new Usage(interaction).run(command)
    }
}

export default new UsageInteraction(USAGE_SWITCH)