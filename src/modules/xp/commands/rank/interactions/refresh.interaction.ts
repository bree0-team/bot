import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {RANK_REFRESH} from '../enums/CustomIds.enum.js'
import {RankUserData} from '../types/data.type.js'
import {View} from '../View.js'

class RefreshInteraction extends PrivateHandler {
    protected run({interaction, data}: ButtonHandlerOptions<RankUserData>) {
        const {userId} = data
        return new View(interaction).run(userId)
    }
}

export default new RefreshInteraction(RANK_REFRESH)