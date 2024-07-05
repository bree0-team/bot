import {PrivateHandler} from '../../../../../handlers/interaction.js'
import {ButtonPageOptions} from '../../../../../handlers/paginator.js'
import {AfterData} from '../../../types/data.type.js'
import {MESSAGES} from '../enums/CustomIds.enum.js'
import {Messages} from '../Messages.js'

class MessagesInteraction extends PrivateHandler {
    protected run({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page} = data
        return new Messages(interaction).run(itemId, after, page)
    }
}

export default new MessagesInteraction(MESSAGES)