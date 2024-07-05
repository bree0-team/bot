import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {AdEdit} from '../../AdEdit.js'
import {CLAN_AD_EDIT_FIELD_MOVE_DOWN} from '../../enums/CustomIds.enum.js'
import {enabledAd} from '../../helpers/enabledAd.js'
import {getOwner} from '../../helpers/getOwner.js'
import ClanAdManager from '../../managers/clan-ad-manager.js'
import {AdEditData} from '../../types/data.type.js'

class FieldDownInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<AdEditData>) {
        getOwner(interaction)
        await enabledAd(interaction)
        const {clanAdId, option, fieldId} = data
        const clanAd = ClanAdManager.findOne(clanAdId)
        const embedFields = clanAd.fields
        if (fieldId === embedFields.length - 1) return;
        const temp = embedFields[fieldId + 1]
        embedFields[fieldId + 1] = embedFields[fieldId]
        embedFields[fieldId] = temp
        await ClanAdManager.update(clanAdId, {fields: embedFields})
        return new AdEdit(interaction).run(clanAdId, option, fieldId + 1)
    }
}

export default new FieldDownInteraction(CLAN_AD_EDIT_FIELD_MOVE_DOWN)