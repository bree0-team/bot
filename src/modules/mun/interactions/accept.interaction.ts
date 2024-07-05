import {ButtonHandlerOptions, PublicHandler} from '../../../handlers/interaction.js'
import {MUN_ACCEPT} from '../enums/CustomIds.enum.js'
import {MunStatus} from '../enums/MunStatus.enum.js'
import {Mun} from '../Mun.js'

class AcceptInteraction extends PublicHandler {
    protected run = ({interaction}: ButtonHandlerOptions) => new Mun(interaction).run(MunStatus.ACCEPT)
}

export default new AcceptInteraction(MUN_ACCEPT)