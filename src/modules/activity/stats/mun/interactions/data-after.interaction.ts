import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {AfterData} from '../../../types/data.type.js'
import {Data} from '../Data.js'
import {MUN_AFTER} from '../enums/CustomIds.enum.js'

class DataAfterInteraction extends PrivateHandler {
    protected runValue({interaction, value, data}: SelectOneValueHandlerOptions<string, AfterData>) {
        const {itemId} = data
        return new Data(interaction).run(itemId, value)
    }
}

export default new DataAfterInteraction(MUN_AFTER)