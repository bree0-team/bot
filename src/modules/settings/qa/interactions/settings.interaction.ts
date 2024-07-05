import {SelectService} from '../../../../builders/select.js'
import {PrivateHandler} from '../../../../handlers/interaction.js'
import {SelectOneValuePageOptions} from '../../../../handlers/paginator.js'
import {QA_SELECT, QaSelectValues} from '../enums/CustomIds.enum.js'
import {Qa} from '../Qa.js'
import {QaData} from '../types/data.type.js'

class SettingsInteraction extends PrivateHandler {
    protected runValue(
        {interaction, value, data}: SelectOneValuePageOptions<QaSelectValues, QaData>
    ) {
        const {channelId} = data
        if (!value) return new Qa(interaction).run(channelId)
        return SelectService.findOne(interaction, value, channelId)
    }
}

export default new SettingsInteraction(QA_SELECT)