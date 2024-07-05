import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {CooldownType} from '../../enums/CooldownType.enum.js'
import SettingsCommandsManager from '../../managers/settings-commands.manager.js'
import {CommandData} from '../../types/data.type.js'
import {Cooldown} from '../Cooldown.js'
import {COOLDOWN_TYPE_SELECT} from '../enums/CustomIds.enum.js'

class CooldownTypeInteraction extends PrivateHandler {
    protected async runValue(
        {interaction, value, data}: SelectOneValueHandlerOptions<CooldownType, CommandData>
    ) {
        const {command} = data
        await SettingsCommandsManager.createOrUpdate(interaction.guildId, command, {cooldownType: value})
        return new Cooldown(interaction).run(command)
    }
}

export default new CooldownTypeInteraction(COOLDOWN_TYPE_SELECT)