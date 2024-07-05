import {SelectService} from '../../../../builders/select.js'
import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {GENERAL_SELECT, SettingsGeneralSelectValuesCustomIds} from '../enums/CustomIds.enum.js'

class GeneralInteraction extends PrivateHandler {
    protected runValue = (
        {interaction, value}: SelectOneValueHandlerOptions<SettingsGeneralSelectValuesCustomIds>
    ) => SelectService.findOne(interaction, value)
}

export default new GeneralInteraction(GENERAL_SELECT)