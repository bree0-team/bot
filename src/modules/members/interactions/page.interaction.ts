import {ButtonPageOptions, ModalPageOptions, PaginatorHandler} from '../../../handlers/paginator.js'
import {MEMBERS_INDEX, MEMBERS_INDEX_MODAL, MEMBERS_NEXT, MEMBERS_PREV} from '../enums/CustomIds.enum.js'
import {Members} from '../Members.js'
import {MembersData} from '../types/data.type.js'

class PageInteraction extends PaginatorHandler {
    protected runPrev({interaction, data}: ButtonPageOptions<MembersData>) {
        const {page, size, roleId} = data
        return new Members(interaction).page(roleId, this.prev(page, size))
    }
    protected runNext({interaction, data}: ButtonPageOptions<MembersData>) {
        const {page, size, roleId} = data
        return new Members(interaction).page(roleId, this.next(page, size))
    }
    protected runFields({interaction, fields, data}: ModalPageOptions<MembersData>) {
        const {size, roleId} = data
        return new Members(interaction).page(roleId, this.getPage(interaction, fields, size))
    }
}

export default new PageInteraction(MEMBERS_PREV, MEMBERS_INDEX, MEMBERS_NEXT, MEMBERS_INDEX_MODAL)