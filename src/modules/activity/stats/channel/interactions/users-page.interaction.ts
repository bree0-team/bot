import {ButtonPageOptions, ModalPageOptions, PaginatorHandler} from '../../../../../handlers/paginator.js'
import {AfterData} from '../../../types/data.type.js'
import {USERS_INDEX, USERS_INDEX_MODAL, USERS_NEXT, USERS_PREV} from '../enums/CustomIds.enum.js'
import {Users} from '../Users.js'

class UsersPageInteraction extends PaginatorHandler {
    protected runPrev({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page, size} = data
        return new Users(interaction).run(itemId, after, this.prev(page, size))
    }
    protected runNext({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page, size} = data
        return new Users(interaction).run(itemId, after, this.next(page, size))
    }
    protected runFields({interaction, fields, data}: ModalPageOptions<AfterData>) {
        const {itemId, after, size} = data
        return new Users(interaction).run(itemId, after, this.getPage(interaction, fields, size))
    }
}

export default new UsersPageInteraction(USERS_PREV, USERS_INDEX, USERS_NEXT, USERS_INDEX_MODAL)