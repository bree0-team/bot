import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {MUN_SEND} from '../enums/CustomIds.enum.js'
import {SendMun} from '../SendMun.js'

class SendInteraction extends PrivateHandler {
    protected run = ({interaction}: ButtonHandlerOptions) => new SendMun(interaction).run()
}

export default new SendInteraction(MUN_SEND)