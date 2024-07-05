import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsQaManager from '../../managers/settings-qa.manager.js'
import {QaData} from '../../types/data.type.js'
import {QA_INTERFACE_MODAL, QA_INTERFACE_MODAL_DESCRIPTION, QA_INTERFACE_MODAL_TITLE} from '../enums/CustomIds.enum.js'
import {Interface} from '../Interface.js'

class InterfaceInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<QaData>) {
        const {channelId} = data
        const title = fields.getTextInputValue(QA_INTERFACE_MODAL_TITLE)
        const description = fields.getTextInputValue(QA_INTERFACE_MODAL_DESCRIPTION)
        await SettingsQaManager.createOrUpdate(interaction, channelId, {title, description})
        return new Interface(interaction).run(channelId)
    }
}

export default new InterfaceInteraction(QA_INTERFACE_MODAL)