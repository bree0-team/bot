import {ButtonPageOptions, ModalPageOptions, PaginatorHandler} from '../../../../../handlers/paginator.js'
import {TIMEZONE_INDEX, TIMEZONE_INDEX_MODAL, TIMEZONE_NEXT, TIMEZONE_PREV} from '../enums/CustomIds.enum.js'
import {Timezone} from '../Timezone.js'

class PageInteraction extends PaginatorHandler {
    protected runPrev({interaction, data}: ButtonPageOptions) {
        const {page, size} = data
        return new Timezone(interaction).run(this.prev(page, size))
    }
    protected runNext({interaction, data}: ButtonPageOptions) {
        const {page, size} = data
        return new Timezone(interaction).run(this.next(page, size))
    }
    protected runFields({interaction, fields, data}: ModalPageOptions) {
        const {size} = data
        return new Timezone(interaction).run(this.getPage(interaction, fields, size))
    }
}

export default new PageInteraction(TIMEZONE_PREV, TIMEZONE_INDEX, TIMEZONE_NEXT, TIMEZONE_INDEX_MODAL)