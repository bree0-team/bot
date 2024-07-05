import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {DiscordLimits} from '../../../../../../enums/DiscordLimits.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../../handlers/interaction.js'
import {Modal} from '../../../../../../services/interaction.js'
import {ClanAdEditButtons, ClanAdEditFooterModal} from '../../../enums/CustomIds.enum.js'
import ClanAdManager from '../../../managers/clan-ad-manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditFooterModalShowInteraction extends ModalHandler {
    protected run({interaction, data}: ButtonHandlerOptions<AdEditData>) {
        const {clanAdId} = data
        const clanAd = ClanAdManager.findOne(clanAdId)
        return Modal(interaction, ClanAdEditFooterModal.modalId,
            interaction.t('embed:footer:label'), [
                new TextInputBuilder({
                    customId: ClanAdEditFooterModal.text,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:footer:options:text'),
                    value: clanAd.footerText,
                    minLength: 0, maxLength: DiscordLimits.EMBED_FOOTER_LENGTH,
                }),
                new TextInputBuilder({
                    customId: ClanAdEditFooterModal.iconUrl,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:footer:options:iconUrl'),
                    value: clanAd.footerIcon,
                    required: false,
                    minLength: 0, maxLength: 1000,
                }),
            ]
        )
    }
}

export default new EditFooterModalShowInteraction(ClanAdEditButtons.footer)