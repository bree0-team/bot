import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {ITEM_CREATE} from '../../enums/CustomIds.enum.js'
import {Create} from '../Create.js'

class CreateInteraction extends PrivateHandler {
    protected run = ({interaction}: ButtonHandlerOptions) => new Create(interaction).run()
}

export default new CreateInteraction(ITEM_CREATE)