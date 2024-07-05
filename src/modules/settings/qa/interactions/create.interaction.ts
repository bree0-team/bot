import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {QA_CREATE} from '../enums/CustomIds.enum.js'
import SettingsQaManager from '../managers/settings-qa.manager.js'
import {Qa} from '../Qa.js'
import {QaData} from '../types/data.type.js'

class CreateInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<QaData>) {
        const {channelId} = data
        await SettingsQaManager.createOrUpdate(interaction, channelId)
        return new Qa(interaction).run(channelId)
    }
}

export default new CreateInteraction(QA_CREATE)