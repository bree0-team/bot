import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import SettingsQaManager from '../../managers/settings-qa.manager.js'
import {QaData} from '../../types/data.type.js'
import {QA_RESP, QA_RESP_MODAL, QA_RESP_MODAL_CONTENT, QA_RESP_MODAL_RESP} from '../enums/CustomIds.enum.js'

class RespModalInteraction extends ModalHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<QaData>) {
        const {channelId} = data
        const qaManager = await SettingsQaManager.findOne(interaction.guildId, channelId)
        const respInput = new TextInputBuilder({
            customId: QA_RESP_MODAL_RESP,
            style: TextInputStyle.Short,
            label: interaction.t('settings:qa:resp:title'),
            minLength: 1, maxLength: 50
        })
        const contentInput = new TextInputBuilder({
            customId: QA_RESP_MODAL_CONTENT,
            style: TextInputStyle.Paragraph,
            label: interaction.t('settings:qa:resp:content'),
            minLength: 1, maxLength: 50
        })
        if (qaManager.resp) respInput.setValue(qaManager.resp)
        if (qaManager.respContent) contentInput.setValue(qaManager.respContent)
        return Modal(interaction, QA_RESP_MODAL, interaction.t('modal:title'), [respInput, contentInput])
    }
}

export default new RespModalInteraction(QA_RESP)