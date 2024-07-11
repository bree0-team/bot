import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../../handlers/interaction.js'
import {Modal} from '../../../../../../services/interaction.js'
import {ClanAdEditButtons, ClanAdEditImagesModal} from '../../../enums/CustomIds.enum.js'
import ClanAdManager from '../../../managers/clan-ad.manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditImagesModalShowInteraction extends ModalHandler {
    protected run({interaction, data}: ButtonHandlerOptions<AdEditData>) {
        const {clanAdId} = data
        const clanAd = ClanAdManager.findOne(clanAdId)
        return Modal(interaction, ClanAdEditImagesModal.modalId,
            interaction.t('embed:images:label'), [
                new TextInputBuilder({
                    customId: ClanAdEditImagesModal.image,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:images:options:image'),
                    value: clanAd.imageUrl,
                    required: false,
                    minLength: 0, maxLength: 1000,
                }),
                new TextInputBuilder({
                    customId: ClanAdEditImagesModal.thumbnail,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:images:options:thumbnail'),
                    value: clanAd.thumbnailUrl,
                    required: false,
                    minLength: 0, maxLength: 1000,
                }),
            ]
        )
    }
}

export default new EditImagesModalShowInteraction(ClanAdEditButtons.images)