import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {AfterData} from '../../../types/data.type.js'
import {MESSAGES_AFTER} from '../enums/CustomIds.enum.js'
import {Messages} from '../Messages.js'

class MessagesAfterInteraction extends PrivateHandler {
    protected runValue({interaction, value, data}: SelectOneValueHandlerOptions<string, AfterData>) {
        const {itemId} = data
        return new Messages(interaction).run(itemId, value)
    }
}

export default new MessagesAfterInteraction(MESSAGES_AFTER)