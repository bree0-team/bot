import {PrivateHandler} from '../../../../../handlers/interaction.js'
import {ButtonPageOptions} from '../../../../../handlers/paginator.js'
import {AfterData} from '../../../types/data.type.js'
import {VOICES} from '../enums/CustomIds.enum.js'
import {Voices} from '../Voices.js'

class VoicesInteraction extends PrivateHandler {
    protected run({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page} = data
        return new Voices(interaction).run(itemId, after, page)
    }
}

export default new VoicesInteraction(VOICES)