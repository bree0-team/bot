import {CommandName} from '../../../../builders/slash.js'
import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {Commands} from '../Commands.js'
import {COMMANDS_SELECT} from '../enums/CustomIds.enum.js'

class CommandInteraction extends PrivateHandler {
    protected runValue = ({interaction, value}: SelectOneValueHandlerOptions<CommandName>) =>
        new Commands(interaction).run(value)
}

export default new CommandInteraction(COMMANDS_SELECT)