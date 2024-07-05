import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import SettingsQaManager from '../../managers/settings-qa.manager.js'
import {QaData} from '../../types/data.type.js'
import {QA_TEXT, QA_TEXT_MODAL, QA_TEXT_MODAL_VALUE} from '../enums/CustomIds.enum.js'

class TextModalInteraction extends ModalHandler {
    protected run({interaction, data}: ButtonHandlerOptions<QaData>) {
        const {channelId} = data
        const qaManager = SettingsQaManager.findOne(interaction.guildId, channelId)
        const textInput = new TextInputBuilder({
            customId: QA_TEXT_MODAL_VALUE,
            style: TextInputStyle.Short,
            label: interaction.t('settings:qa:options:text'),
            minLength: 1, maxLength: 50
        })
        if (qaManager.text) textInput.setValue(qaManager.text)
        return Modal(interaction, QA_TEXT_MODAL, interaction.t('modal:title'), [textInput])
    }
}

export default new TextModalInteraction(QA_TEXT)