import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {AfterData} from '../../../types/data.type.js'
import {RANK} from '../enums/CustomIds.enum.js'
import {Rank} from '../Rank.js'

class RankInteraction extends PrivateHandler {
    protected run({interaction, data}: ButtonHandlerOptions<AfterData>) {
        const {itemId, after} = data
        return new Rank(interaction).run(itemId, after)
    }
}

export default new RankInteraction(RANK)