import {ModalHandlerOptions, PrivateHandler} from '../../../../../../handlers/interaction.js'
import {AdEdit} from '../../../AdEdit.js'
import {CLAN_AD_EDIT_FIELD_ADD_MODAL, ClanAdEditFieldModal} from '../../../enums/CustomIds.enum.js'
import {enabledAd} from '../../../helpers/enabledAd.js'
import {getOwner} from '../../../helpers/getOwner.js'
import ClanAdManager from '../../../managers/clan-ad-manager.js'
import {AdEditData} from '../../../types/data.type.js'

class AddFieldsModalInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<AdEditData>) {
        getOwner(interaction)
        await enabledAd(interaction)
        const name = fields.getTextInputValue(ClanAdEditFieldModal.name)
        const value = fields.getTextInputValue(ClanAdEditFieldModal.value)
        const inline = fields.getTextInputValue(ClanAdEditFieldModal.inline)
        const {clanAdId, option} = data
        const clanAd = ClanAdManager.findOne(clanAdId)
        const embedFields = clanAd.fields
        embedFields.push({name, value, inline: Boolean(inline)})
        await ClanAdManager.update(clanAdId, {fields: embedFields})
        return new AdEdit(interaction).run(clanAdId, option, embedFields.length - 1)
    }
}

export default new AddFieldsModalInteraction(CLAN_AD_EDIT_FIELD_ADD_MODAL)