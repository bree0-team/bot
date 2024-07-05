import {ButtonPageOptions, ModalPageOptions, PaginatorHandler} from '../../../handlers/paginator.js'
import {ROLES_INDEX, ROLES_INDEX_MODAL, ROLES_NEXT, ROLES_PREV} from '../enums/CustomIds.enum.js'
import {Roles} from '../Roles.js'
import {EditData} from '../types/data.type.js'

class RolesPageInteraction extends PaginatorHandler {
    protected runPrev({interaction, data}: ButtonPageOptions<EditData>) {
        const {userId, page, size} = data
        return new Roles(interaction).run(userId, this.prev(page, size))
    }
    protected runNext({interaction, data}: ButtonPageOptions<EditData>) {
        const {userId, page, size} = data
        return new Roles(interaction).run(userId, this.next(page, size))
    }
    protected runFields({interaction, fields, data}: ModalPageOptions<EditData>) {
        const {userId, size} = data
        return new Roles(interaction).run(userId, this.getPage(interaction, fields, size))
    }
}

export default new RolesPageInteraction(ROLES_PREV, ROLES_INDEX, ROLES_NEXT, ROLES_INDEX_MODAL)