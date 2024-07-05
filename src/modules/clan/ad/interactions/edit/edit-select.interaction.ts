import {InteractionHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {AdEdit} from '../../AdEdit.js'
import {CLAN_AD_EDIT, ClanAdEditOptions} from '../../enums/CustomIds.enum.js'
import {AdEditData} from '../../types/data.type.js'

class EditSelectInteraction extends InteractionHandler {
    protected runValue({interaction, value, data}: SelectOneValueHandlerOptions<ClanAdEditOptions, AdEditData>) {
        const {clanAdId} = data
        return new AdEdit(interaction).run(clanAdId, value)
    }
}

export default new EditSelectInteraction(CLAN_AD_EDIT)