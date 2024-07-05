import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {DiscordLimits} from '../../../../../../enums/DiscordLimits.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../../handlers/interaction.js'
import {Modal} from '../../../../../../services/interaction.js'
import {SplitUtils} from '../../../../../../utils/split.js'
import {ClanAdEditBodyModal, ClanAdEditButtons} from '../../../enums/CustomIds.enum.js'
import ClanAdManager from '../../../managers/clan-ad-manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditBodyModalShowInteraction extends ModalHandler {
    protected run({interaction, data}: ButtonHandlerOptions<AdEditData>) {
        const {clanAdId} = data
        const clanAd = ClanAdManager.findOne(clanAdId)
        const colorField = new TextInputBuilder({
            customId: ClanAdEditBodyModal.color,
            style: TextInputStyle.Short,
            label: interaction.t('embed:body:options:color'),
            required: false,
            minLength: 0, maxLength: 7,
        })
        if (clanAd.color) colorField.setValue(SplitUtils.decimalToHex(clanAd.color))
        return Modal(interaction, ClanAdEditBodyModal.modalId,
            interaction.t('embed:body:label'), [
                colorField,
                new TextInputBuilder({
                    customId: ClanAdEditBodyModal.title,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:body:options:title'),
                    value: clanAd.bodyTitle,
                    required: false,
                    minLength: 0, maxLength: DiscordLimits.EMBED_TITLE_LENGTH,
                }),
                new TextInputBuilder({
                    customId: ClanAdEditBodyModal.description,
                    style: TextInputStyle.Paragraph,
                    label: interaction.t('embed:body:options:description'),
                    value: clanAd.bodyDescription,
                    required: false,
                    minLength: 0, maxLength: 4000,
                }),
                new TextInputBuilder({
                    customId: ClanAdEditBodyModal.url,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:body:options:url'),
                    value: clanAd.bodyUrl,
                    required: false,
                    minLength: 0, maxLength: 1000,
                }),
            ]
        )
    }
}

export default new EditBodyModalShowInteraction(ClanAdEditButtons.body)