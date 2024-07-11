import {ValidUrlError} from '../../../../../../errors/servererror.js'
import {ModalHandlerOptions, PrivateHandler} from '../../../../../../handlers/interaction.js'
import {UrlUtils} from '../../../../../../utils/url.js'
import {AdEdit} from '../../../AdEdit.js'
import {ClanAdEditImagesModal} from '../../../enums/CustomIds.enum.js'
import {enabledAd} from '../../../helpers/enabledAd.js'
import {getOwner} from '../../../helpers/getOwner.js'
import ClanAdManager from '../../../managers/clan-ad.manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditImagesModalInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<AdEditData>) {
        getOwner(interaction)
        await enabledAd(interaction)
        let imageUrl = fields.getTextInputValue(ClanAdEditImagesModal.image)
        let thumbnailUrl = fields.getTextInputValue(ClanAdEditImagesModal.thumbnail)
        if (imageUrl) {
            const validUrl = UrlUtils.isValidHttpUrl(imageUrl)
            if (!validUrl) throw new ValidUrlError(interaction)
        } else imageUrl = null
        if (thumbnailUrl) {
            const validUrl = UrlUtils.isValidHttpUrl(thumbnailUrl)
            if (!validUrl) throw new ValidUrlError(interaction)
        } else thumbnailUrl = null
        const {clanAdId, option} = data
        await ClanAdManager.update(clanAdId, {imageUrl, thumbnailUrl})
        return new AdEdit(interaction).run(clanAdId, option)
    }
}

export default new EditImagesModalInteraction(ClanAdEditImagesModal.modalId)