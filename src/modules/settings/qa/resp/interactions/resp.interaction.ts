import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsQaManager from '../../managers/settings-qa.manager.js'
import {QaData} from '../../types/data.type.js'
import {QA_RESP_MODAL, QA_RESP_MODAL_CONTENT, QA_RESP_MODAL_RESP} from '../enums/CustomIds.enum.js'
import {Resp} from '../Resp.js'

class RespInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<QaData>) {
        const {channelId} = data
        const resp = fields.getTextInputValue(QA_RESP_MODAL_RESP)
        const respContent = fields.getTextInputValue(QA_RESP_MODAL_CONTENT)
        await SettingsQaManager.createOrUpdate(interaction, channelId, {resp, respContent})
        return new Resp(interaction).run(channelId)
    }
}

export default new RespInteraction(QA_RESP_MODAL)