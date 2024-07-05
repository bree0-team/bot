import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {AfterData} from '../../../types/data.type.js'
import {RANK_AFTER} from '../enums/CustomIds.enum.js'
import {Rank} from '../Rank.js'

class RankAfterInteraction extends PrivateHandler {
    protected runValue({interaction, value, data}: SelectOneValueHandlerOptions<string, AfterData>) {
        const {itemId} = data
        return new Rank(interaction).run(itemId, value)
    }
}

export default new RankAfterInteraction(RANK_AFTER)