import {SelectService} from '../../../../builders/select.js'
import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {XP_SELECT, XpSelectValues} from '../enums/CustomIds.enum.js'

class SettingsInteraction extends PrivateHandler {
    protected runValue = ({interaction, value}: SelectOneValueHandlerOptions<XpSelectValues>) =>
        SelectService.findOne(interaction, value)
}

export default new SettingsInteraction(XP_SELECT)