import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {QA_WRITE, QA_WRITE_MODAL, QA_WRITE_MODAL_DESCRIPTION, QA_WRITE_MODAL_TITLE} from '../enums/CustomIds.enum.js'

class WriteModalInteraction extends ModalHandler {
    protected run({interaction}: ButtonHandlerOptions) {
        return Modal(interaction, QA_WRITE_MODAL, interaction.t('qa:modal:title'), [
            new TextInputBuilder({
                customId: QA_WRITE_MODAL_TITLE,
                style: TextInputStyle.Short,
                label: interaction.t('qa:modal:label'),
                required: false,
                minLength: DiscordLimits.MODAL_TEXT_INPUT_MIN_VALUE,
                maxLength: DiscordLimits.EMBED_TITLE_LENGTH
            }),
            new TextInputBuilder({
                customId: QA_WRITE_MODAL_DESCRIPTION,
                style: TextInputStyle.Paragraph,
                label: interaction.t('description'),
                maxLength: 4000
            })
        ])
    }
}

export default new WriteModalInteraction(QA_WRITE, false)