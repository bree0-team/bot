import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {Ad} from '../Ad.js'
import {CLAN_AD} from '../enums/CustomIds.enum.js'

class BackInteraction extends PrivateHandler {
    protected run = ({interaction}: ButtonHandlerOptions) => new Ad(interaction).run()
}

export default new BackInteraction(CLAN_AD)