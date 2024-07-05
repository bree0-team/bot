import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsQaManager from '../../managers/settings-qa.manager.js'
import {QaData} from '../../types/data.type.js'
import {QA_ADDS_RESP_MODAL, QA_ADDS_RESP_MODAL_CONTENT, QA_ADDS_RESP_MODAL_RESP} from '../enums/CustomIds.enum.js'
import {AddsResp} from '../AddsResp.js'

class AddsRespInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<QaData>) {
        const {channelId} = data
        const addsResp = fields.getTextInputValue(QA_ADDS_RESP_MODAL_RESP)
        const addsRespContent = fields.getTextInputValue(QA_ADDS_RESP_MODAL_CONTENT)
        await SettingsQaManager.createOrUpdate(interaction, channelId, {addsResp, addsRespContent})
        return new AddsResp(interaction).run(channelId)
    }
}

export default new AddsRespInteraction(QA_ADDS_RESP_MODAL)