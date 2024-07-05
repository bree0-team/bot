import {ValidUrlError} from '../../../../../../errors/servererror.js'
import {InteractionHandler, ModalHandlerOptions} from '../../../../../../handlers/interaction.js'
import {SplitUtils} from '../../../../../../utils/split.js'
import {UrlUtils} from '../../../../../../utils/url.js'
import {AdEdit} from '../../../AdEdit.js'
import {ClanAdEditBodyModal} from '../../../enums/CustomIds.enum.js'
import {enabledAd} from '../../../helpers/enabledAd.js'
import {getOwner} from '../../../helpers/getOwner.js'
import ClanAdManager from '../../../managers/clan-ad-manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditBodyModalInteraction extends InteractionHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<AdEditData>) {
        getOwner(interaction)
        await enabledAd(interaction)
        const color = fields.getTextInputValue(ClanAdEditBodyModal.color)
        const bodyTitle = fields.getTextInputValue(ClanAdEditBodyModal.title)
        const bodyDescription = fields.getTextInputValue(ClanAdEditBodyModal.description)
        let bodyUrl = fields.getTextInputValue(ClanAdEditBodyModal.url)
        if (bodyUrl) {
            const validUrl = UrlUtils.isValidHttpUrl(bodyUrl)
            if (!validUrl) throw new ValidUrlError(interaction)
        } else bodyUrl = null
        const {clanAdId, option} = data
        await ClanAdManager.update(clanAdId, {
            color: SplitUtils.hexToDecimal(color), bodyTitle, bodyDescription
        })
        return new AdEdit(interaction).run(clanAdId, option)
    }
}

export default new EditBodyModalInteraction(ClanAdEditBodyModal.modalId)