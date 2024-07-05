import {ButtonHandlerOptions, PublicHandler} from '../../../handlers/interaction.js'
import {MUN_CLEAR} from '../enums/CustomIds.enum.js'
import {MunStatus} from '../enums/MunStatus.enum.js'
import {Mun} from '../Mun.js'

class ClearInteraction extends PublicHandler {
    protected run = ({interaction}: ButtonHandlerOptions) => new Mun(interaction).run(MunStatus.CLEAR)
}

export default new ClearInteraction(MUN_CLEAR)