import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {DiscordLimits} from '../../../../../enums/DiscordLimits.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import SettingsQaManager from '../../managers/settings-qa.manager.js'
import {QaData} from '../../types/data.type.js'
import {
    QA_INTERFACE,
    QA_INTERFACE_MODAL,
    QA_INTERFACE_MODAL_DESCRIPTION,
    QA_INTERFACE_MODAL_TITLE
} from '../enums/CustomIds.enum.js'

class InterfaceModalInteraction extends ModalHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<QaData>) {
        const {channelId} = data
        const qaManager = await SettingsQaManager.findOne(interaction.guildId, channelId)
        const titleInput = new TextInputBuilder({
            customId: QA_INTERFACE_MODAL_TITLE,
            style: TextInputStyle.Short,
            label: interaction.t('embed:body:options:title'),
            minLength: DiscordLimits.MODAL_TEXT_INPUT_MIN_VALUE,
            maxLength: DiscordLimits.EMBED_TITLE_LENGTH,
            required: false
        })
        const descriptionInput = new TextInputBuilder({
            customId: QA_INTERFACE_MODAL_DESCRIPTION,
            style: TextInputStyle.Paragraph,
            label: interaction.t('embed:body:options:description'),
            minLength: DiscordLimits.MODAL_TEXT_INPUT_MIN_VALUE,
            maxLength: 4000,
            required: false
        })
        if (qaManager.title) titleInput.setValue(qaManager.title)
        if (qaManager.description) descriptionInput.setValue(qaManager.description)
        return Modal(interaction, QA_INTERFACE_MODAL, interaction.t('settings:qa:interface_modal'), [
            titleInput, descriptionInput
        ])
    }
}

export default new InterfaceModalInteraction(QA_INTERFACE)