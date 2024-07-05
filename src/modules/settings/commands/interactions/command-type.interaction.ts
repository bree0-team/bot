import {SelectService} from '../../../../builders/select.js'
import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {COMMAND_TYPE_SELECT, SettingsCommandsTypeSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {CommandData} from '../types/data.type.js'

class CommandTypeInteraction extends PrivateHandler {
    protected runValue(
        {interaction, value, data}: SelectOneValueHandlerOptions<SettingsCommandsTypeSelectValuesCustomIds, CommandData>
    ) {
        const {command} = data
        return SelectService.findOne(interaction, value, command)
    }
}

export default new CommandTypeInteraction(COMMAND_TYPE_SELECT)