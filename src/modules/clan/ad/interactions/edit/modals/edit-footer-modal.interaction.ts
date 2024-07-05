import {ValidUrlError} from '../../../../../../errors/servererror.js'
import {ModalHandlerOptions, PrivateHandler} from '../../../../../../handlers/interaction.js'
import {UrlUtils} from '../../../../../../utils/url.js'
import {AdEdit} from '../../../AdEdit.js'
import {ClanAdEditFooterModal} from '../../../enums/CustomIds.enum.js'
import {enabledAd} from '../../../helpers/enabledAd.js'
import {getOwner} from '../../../helpers/getOwner.js'
import ClanAdManager from '../../../managers/clan-ad-manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditFooterModalInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<AdEditData>) {
        getOwner(interaction)
        await enabledAd(interaction)
        const footerText = fields.getTextInputValue(ClanAdEditFooterModal.text)
        let footerIcon = fields.getTextInputValue(ClanAdEditFooterModal.iconUrl)
        if (footerIcon) {
            const validUrl = UrlUtils.isValidHttpUrl(footerIcon)
            if (!validUrl) throw new ValidUrlError(interaction)
        } else footerIcon = null
        const {clanAdId, option} = data
        await ClanAdManager.update(clanAdId, {footerText, footerIcon})
        return new AdEdit(interaction).run(clanAdId, option)
    }
}

export default new EditFooterModalInteraction(ClanAdEditFooterModal.modalId)