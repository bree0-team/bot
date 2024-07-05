import {ButtonPageOptions, ModalPageOptions, PaginatorHandler} from '../../../../../handlers/paginator.js'
import {TOP_INDEX, TOP_INDEX_MODAL, TOP_NEXT, TOP_PREV} from '../enums/CustomIds.enum.js'
import {Top} from '../Top.js'

class PageInteraction extends PaginatorHandler {
    protected runPrev({interaction, data}: ButtonPageOptions) {
        const {page, size} = data
        return new Top(interaction).run(this.prev(page, size))
    }
    protected runNext({interaction, data}: ButtonPageOptions) {
        const {page, size} = data
        return new Top(interaction).run(this.next(page, size))
    }
    protected runFields({interaction, fields, data}: ModalPageOptions) {
        const {size} = data
        return new Top(interaction).run(this.getPage(interaction, fields, size))
    }
}

export default new PageInteraction(TOP_PREV, TOP_INDEX, TOP_NEXT, TOP_INDEX_MODAL)