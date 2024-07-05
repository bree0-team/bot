import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {AfterData} from '../../../types/data.type.js'
import {VOICES_AFTER} from '../enums/CustomIds.enum.js'
import {Voices} from '../Voices.js'

class VoicesAfterInteraction extends PrivateHandler {
    protected runValue({interaction, value, data}: SelectOneValueHandlerOptions<string, AfterData>) {
        const {itemId} = data
        return new Voices(interaction).run(itemId, value)
    }
}

export default new VoicesAfterInteraction(VOICES_AFTER)