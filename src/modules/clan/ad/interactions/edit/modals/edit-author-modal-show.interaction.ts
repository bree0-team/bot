import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {DiscordLimits} from '../../../../../../enums/DiscordLimits.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../../handlers/interaction.js'
import {Modal} from '../../../../../../services/interaction.js'
import {ClanAdEditAuthorModal, ClanAdEditButtons} from '../../../enums/CustomIds.enum.js'
import ClanAdManager from '../../../managers/clan-ad-manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditAuthorModalShowInteraction extends ModalHandler {
    protected run({interaction, data}: ButtonHandlerOptions<AdEditData>) {
        const {clanAdId} = data
        const clanAd = ClanAdManager.findOne(clanAdId)
        return Modal(interaction, ClanAdEditAuthorModal.modalId,
            interaction.t('embed:author:label'), [
                new TextInputBuilder({
                    customId: ClanAdEditAuthorModal.name,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:author:options:name'),
                    value: clanAd.author,
                    minLength: 0, maxLength: DiscordLimits.EMBED_AUTHOR_LENGTH,
                }),
                new TextInputBuilder({
                    customId: ClanAdEditAuthorModal.url,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:author:options:url'),
                    value: clanAd.authorUrl,
                    required: false,
                    minLength: 0, maxLength: 1000,
                }),
                new TextInputBuilder({
                    customId: ClanAdEditAuthorModal.iconUrl,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:author:options:iconUrl'),
                    value: clanAd.authorIcon,
                    required: false,
                    minLength: 0, maxLength: 1000,
                }),
            ]
        )
    }
}

export default new EditAuthorModalShowInteraction(ClanAdEditButtons.author)