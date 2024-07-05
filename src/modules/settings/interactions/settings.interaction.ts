import {SelectService} from '../../../builders/select.js'
import {ButtonHandlerOptions, PrivateHandler, SelectOneValueHandlerOptions} from '../../../handlers/interaction.js'
import {MAIN_SELECT, MainSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {Settings} from '../Settings.js'

class SettingsInteraction extends PrivateHandler {
    protected run = ({interaction}: ButtonHandlerOptions) => new Settings(interaction).run()
    protected runValue = ({interaction, value}: SelectOneValueHandlerOptions<MainSelectValuesCustomIds>) =>
        SelectService.findOne(interaction, value)
}

export default new SettingsInteraction(MAIN_SELECT)