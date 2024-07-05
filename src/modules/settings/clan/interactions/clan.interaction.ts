import {SelectService} from '../../../../builders/select.js'
import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'

class ClanInteraction extends PrivateHandler {
    protected runValue = ({interaction, value}: SelectOneValueHandlerOptions<SettingsClanSelectValuesCustomIds>) =>
        SelectService.findOne(interaction, value)
}

export default new ClanInteraction(CLAN_SELECT)