import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {DiscordLimits} from '../../../../../../enums/DiscordLimits.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../../handlers/interaction.js'
import {Modal} from '../../../../../../services/interaction.js'
import {ClanAdEditButtons, ClanAdEditFieldModal} from '../../../enums/CustomIds.enum.js'
import ClanAdManager from '../../../managers/clan-ad-manager.js'
import {AdEditData} from '../../../types/data.type.js'

class EditFieldsModalShowInteraction extends ModalHandler {
    protected run({interaction, data}: ButtonHandlerOptions<AdEditData>) {
        const {clanAdId, fieldId} = data
        const clanAd = ClanAdManager.findOne(clanAdId)
        const field = clanAd.fields.at(fieldId)
        return Modal(interaction, ClanAdEditFieldModal.modalId,
            interaction.t('embed:fields:label'), [
                new TextInputBuilder({
                    customId: ClanAdEditFieldModal.name,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:fields:options:name'),
                    value: field.name,
                    minLength: 0, maxLength: DiscordLimits.EMBED_FIELD_NAME_LENGTH,
                }),
                new TextInputBuilder({
                    customId: ClanAdEditFieldModal.value,
                    style: TextInputStyle.Paragraph,
                    label: interaction.t('embed:fields:options:value'),
                    value: field.value,
                    minLength: 0, maxLength: DiscordLimits.EMBED_FIELD_VALUE_LENGTH,
                }),
                new TextInputBuilder({
                    customId: ClanAdEditFieldModal.inline,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:fields:options:inline'),
                    value: Number(field.inline).toString(),
                    required: false,
                    minLength: 0, maxLength: 1,
                }),
            ]
        )
    }
}

export default new EditFieldsModalShowInteraction(ClanAdEditButtons.fields)