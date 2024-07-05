import {ButtonPageOptions, ModalPageOptions, PaginatorHandler} from '../../../../../handlers/paginator.js'
import {AfterData} from '../../../types/data.type.js'
import {Data} from '../Data.js'
import {MUN_INDEX, MUN_INDEX_MODAL, MUN_NEXT, MUN_PREV} from '../enums/CustomIds.enum.js'

class DataPageInteraction extends PaginatorHandler {
    protected runPrev({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page, size} = data
        return new Data(interaction).run(itemId, after, this.prev(page, size))
    }
    protected runNext({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page, size} = data
        return new Data(interaction).run(itemId, after, this.next(page, size))
    }
    protected runFields({interaction, fields, data}: ModalPageOptions<AfterData>) {
        const {itemId, after, size} = data
        return new Data(interaction).run(itemId, after, this.getPage(interaction, fields, size))
    }
}

export default new DataPageInteraction(MUN_PREV, MUN_INDEX, MUN_NEXT, MUN_INDEX_MODAL)