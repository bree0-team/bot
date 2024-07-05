import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {QA_DELETE} from '../enums/CustomIds.enum.js'
import SettingsQaManager from '../managers/settings-qa.manager.js'
import {Qa} from '../Qa.js'
import {QaData} from '../types/data.type.js'

class DeleteInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<QaData>) {
        const {channelId} = data
        await SettingsQaManager.remove(interaction.guildId, channelId)
        return new Qa(interaction).run(channelId)
    }
}

export default new DeleteInteraction(QA_DELETE)