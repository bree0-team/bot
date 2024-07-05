import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../../handlers/interaction.js'
import {Modal} from '../../../../../services/interaction.js'
import SettingsQaManager from '../../managers/settings-qa.manager.js'
import {QaData} from '../../types/data.type.js'
import {
    QA_ADDS_RESP,
    QA_ADDS_RESP_MODAL,
    QA_ADDS_RESP_MODAL_CONTENT,
    QA_ADDS_RESP_MODAL_RESP
} from '../enums/CustomIds.enum.js'

class AddsRespModalInteraction extends ModalHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<QaData>) {
        const {channelId} = data
        const qaManager = await SettingsQaManager.findOne(interaction.guildId, channelId)
        const respInput = new TextInputBuilder({
            customId: QA_ADDS_RESP_MODAL_RESP,
            style: TextInputStyle.Short,
            label: interaction.t('settings:qa:adds_resp:title'),
            minLength: 1, maxLength: 50
        })
        const contentInput = new TextInputBuilder({
            customId: QA_ADDS_RESP_MODAL_CONTENT,
            style: TextInputStyle.Paragraph,
            label: interaction.t('settings:qa:adds_resp:content'),
            minLength: 1, maxLength: 50
        })
        if (qaManager.addsResp) respInput.setValue(qaManager.addsResp)
        if (qaManager.addsRespContent) contentInput.setValue(qaManager.addsRespContent)
        return Modal(interaction, QA_ADDS_RESP_MODAL, interaction.t('modal:title'), [
            respInput, contentInput
        ])
    }
}

export default new AddsRespModalInteraction(QA_ADDS_RESP)