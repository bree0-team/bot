import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {AdEdit} from '../../AdEdit.js'
import {CLAN_AD_EDIT_FIELD_DELETE} from '../../enums/CustomIds.enum.js'
import {enabledAd} from '../../helpers/enabledAd.js'
import {getOwner} from '../../helpers/getOwner.js'
import ClanAdManager from '../../managers/clan-ad.manager.js'
import {AdEditData} from '../../types/data.type.js'

class DeleteFieldInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<AdEditData>) {
        getOwner(interaction)
        await enabledAd(interaction)
        const {clanAdId, option, fieldId} = data
        const {fields} = ClanAdManager.findOne(clanAdId)
        fields.splice(fieldId, 1)
        await ClanAdManager.update(clanAdId, {fields})
        return new AdEdit(interaction).run(clanAdId, option)
    }
}

export default new DeleteFieldInteraction(CLAN_AD_EDIT_FIELD_DELETE)