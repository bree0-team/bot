import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsQaManager from '../../managers/settings-qa.manager.js'
import {QaData} from '../../types/data.type.js'
import {QA_TEXT_MODAL, QA_TEXT_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {Text} from '../Text.js'

class TextInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<QaData>) {
        const {channelId} = data
        const text = fields.getTextInputValue(QA_TEXT_MODAL_VALUE)
        await SettingsQaManager.createOrUpdate(interaction, channelId, {text})
        return new Text(interaction).run(channelId)
    }
}

export default new TextInteraction(QA_TEXT_MODAL)