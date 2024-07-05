import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {AdEdit} from '../../AdEdit.js'
import {CLAN_AD_SELECT} from '../../enums/CustomIds.enum.js'

class EditInteraction extends PrivateHandler {
    protected runValue = ({interaction, value}: SelectOneValueHandlerOptions) => new AdEdit(interaction)
        .run(Number(value))
}

export default new EditInteraction(CLAN_AD_SELECT)