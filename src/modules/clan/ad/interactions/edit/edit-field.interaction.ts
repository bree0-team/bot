import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {AdEdit} from '../../AdEdit.js'
import {CLAN_AD_EDIT_FIELDS_SELECT} from '../../enums/CustomIds.enum.js'
import {AdEditData} from '../../types/data.type.js'

class EditFieldInteraction extends PrivateHandler {
    protected runValue({interaction, value, data}: SelectOneValueHandlerOptions<string, AdEditData>) {
        const {clanAdId, option} = data
        return new AdEdit(interaction).run(clanAdId, option, Number(value))
    }
}

export default new EditFieldInteraction(CLAN_AD_EDIT_FIELDS_SELECT)