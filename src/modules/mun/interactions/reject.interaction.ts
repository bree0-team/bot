import {ButtonHandlerOptions, PublicHandler} from '../../../handlers/interaction.js'
import {MUN_REJECT} from '../enums/CustomIds.enum.js'
import {MunStatus} from '../enums/MunStatus.enum.js'
import {Mun} from '../Mun.js'

class RejectInteraction extends PublicHandler {
    protected run = ({interaction}: ButtonHandlerOptions) => new Mun(interaction).run(MunStatus.REJECT)
}

export default new RejectInteraction(MUN_REJECT)