import {PrivateHandler} from '../../../../../handlers/interaction.js'
import {ButtonPageOptions} from '../../../../../handlers/paginator.js'
import {TOP_REFRESH} from '../enums/CustomIds.enum.js'
import {Top} from '../Top.js'

class RefreshInteraction extends PrivateHandler {
    protected run({interaction, data}: ButtonPageOptions) {
        const {page} = data
        return new Top(interaction).run(page)
    }
}

export default new RefreshInteraction(TOP_REFRESH)