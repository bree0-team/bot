import {ModalHandlerOptions, PrivateHandler} from '../../../../../../handlers/interaction.js'
import {AdEdit} from '../../../AdEdit.js'
import {CLAN_AD_NAME_MODAL, CLAN_AD_NAME_MODAL_VALUE} from '../../../enums/CustomIds.enum.js'
import {enabledAd} from '../../../helpers/enabledAd.js'
import {getOwner} from '../../../helpers/getOwner.js'
import ClanAdManager from '../../../managers/clan-ad-manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditNameModalInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<AdEditData>) {
        getOwner(interaction)
        await enabledAd(interaction)
        const title = fields.getTextInputValue(CLAN_AD_NAME_MODAL_VALUE)
        const {clanAdId} = data
        await ClanAdManager.update(clanAdId, {title})
        return new AdEdit(interaction).run(clanAdId)
    }
}

export default new EditNameModalInteraction(CLAN_AD_NAME_MODAL)