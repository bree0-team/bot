import {ButtonHandlerOptions, PublicHandler} from '../../../handlers/interaction.js'
import {QA_ACTION} from '../enums/CustomIds.enum.js'
import {Action} from '../Action.js'

class ActionInteraction extends PublicHandler {
    protected run = ({interaction}: ButtonHandlerOptions) => new Action(interaction).run(interaction.message.id)
}

export default new ActionInteraction(QA_ACTION)