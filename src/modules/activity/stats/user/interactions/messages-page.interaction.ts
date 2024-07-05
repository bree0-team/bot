import {ButtonPageOptions, ModalPageOptions, PaginatorHandler} from '../../../../../handlers/paginator.js'
import {AfterData} from '../../../types/data.type.js'
import {MESSAGES_INDEX, MESSAGES_INDEX_MODAL, MESSAGES_NEXT, MESSAGES_PREV} from '../enums/CustomIds.enum.js'
import {Messages} from '../Messages.js'

class MessagesPageInteraction extends PaginatorHandler {
    protected runPrev({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page, size} = data
        return new Messages(interaction).run(itemId, after, this.prev(page, size))
    }
    protected runNext({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page, size} = data
        return new Messages(interaction).run(itemId, after, this.next(page, size))
    }
    protected runFields({interaction, fields, data}: ModalPageOptions<AfterData>) {
        const {itemId, after, size} = data
        return new Messages(interaction).run(itemId, after, this.getPage(interaction, fields, size))
    }
}

export default new MessagesPageInteraction(MESSAGES_PREV, MESSAGES_INDEX, MESSAGES_NEXT, MESSAGES_INDEX_MODAL)