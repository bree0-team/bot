import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {QA_REPLY} from '../../enums/CustomIds.enum.js'
import {QaData} from '../../types/data.type.js'
import {QA_REPLY_MODAL, QA_REPLY_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class ReplyModalInteraction extends ModalHandler {
    protected run({interaction}: ButtonHandlerOptions<QaData>) {
        return Modal(interaction, QA_REPLY_MODAL, interaction.t('qa:modal:title'), [
            new TextInputBuilder({
                customId: QA_REPLY_MODAL_VALUE,
                style: TextInputStyle.Paragraph,
                label: interaction.t('description'),
                maxLength: DiscordLimits.EMBED_FIELD_VALUE_LENGTH
            })
        ])
    }
}

export default new ReplyModalInteraction(QA_REPLY)