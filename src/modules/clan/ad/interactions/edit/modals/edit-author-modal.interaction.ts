import {ValidUrlError} from '../../../../../../errors/servererror.js'
import {ModalHandlerOptions, PrivateHandler} from '../../../../../../handlers/interaction.js'
import {UrlUtils} from '../../../../../../utils/url.js'
import {AdEdit} from '../../../AdEdit.js'
import {ClanAdEditAuthorModal} from '../../../enums/CustomIds.enum.js'
import {enabledAd} from '../../../helpers/enabledAd.js'
import {getOwner} from '../../../helpers/getOwner.js'
import ClanAdManager from '../../../managers/clan-ad-manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditAuthorModalInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<AdEditData>) {
        getOwner(interaction)
        await enabledAd(interaction)
        const author = fields.getTextInputValue(ClanAdEditAuthorModal.name)
        let authorUrl = fields.getTextInputValue(ClanAdEditAuthorModal.url)
        let authorIcon = fields.getTextInputValue(ClanAdEditAuthorModal.iconUrl)
        if (authorUrl) {
            const validUrl = UrlUtils.isValidHttpUrl(authorUrl)
            if (!validUrl) throw new ValidUrlError(interaction)
        } else authorUrl = null
        if (authorIcon) {
            const validUrl = UrlUtils.isValidHttpUrl(authorIcon)
            if (!validUrl) throw new ValidUrlError(interaction)
        } else authorIcon = null
        const {clanAdId, option} = data
        await ClanAdManager.update(clanAdId, {author, authorUrl, authorIcon})
        return new AdEdit(interaction).run(clanAdId, option)
    }
}

export default new EditAuthorModalInteraction(ClanAdEditAuthorModal.modalId)