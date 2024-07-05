import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {Data} from '../Data.js'
import {DATA_AFTER} from '../enums/CustomIds.enum.js'
import {AfterQaData} from '../types/data.type.js'

class DataAfterInteraction extends PrivateHandler {
    protected runValue({interaction, value, data}: SelectOneValueHandlerOptions<string, AfterQaData>) {
        const {userId, channelId} = data
        return new Data(interaction).run(userId, channelId, value)
    }
}

export default new DataAfterInteraction(DATA_AFTER)