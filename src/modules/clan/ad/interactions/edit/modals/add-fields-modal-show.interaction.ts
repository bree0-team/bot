import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {DiscordLimits} from '../../../../../../enums/DiscordLimits.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../../handlers/interaction.js'
import {Modal} from '../../../../../../services/interaction.js'
import {
    CLAN_AD_EDIT_FIELD_ADD,
    CLAN_AD_EDIT_FIELD_ADD_MODAL,
    ClanAdEditFieldModal
} from '../../../enums/CustomIds.enum.js'

class AddFieldsModalShowInteraction extends ModalHandler {
    protected run({interaction}: ButtonHandlerOptions) {
        return Modal(interaction, CLAN_AD_EDIT_FIELD_ADD_MODAL,
            interaction.t('embed:fields:label'), [
                new TextInputBuilder({
                    customId: ClanAdEditFieldModal.name,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:fields:options:name'),
                    minLength: 0, maxLength: DiscordLimits.EMBED_FIELD_NAME_LENGTH,
                }),
                new TextInputBuilder({
                    customId: ClanAdEditFieldModal.value,
                    style: TextInputStyle.Paragraph,
                    label: interaction.t('embed:fields:options:value'),
                    minLength: 0, maxLength: DiscordLimits.EMBED_FIELD_VALUE_LENGTH,
                }),
                new TextInputBuilder({
                    customId: ClanAdEditFieldModal.inline,
                    style: TextInputStyle.Short,
                    label: interaction.t('embed:fields:options:inline'),
                    required: false,
                    minLength: 0, maxLength: 1,
                })
            ]
        )
    }
}

export default new AddFieldsModalShowInteraction(CLAN_AD_EDIT_FIELD_ADD)