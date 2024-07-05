import {ButtonPageOptions, ModalPageOptions, PaginatorHandler} from '../../../../../handlers/paginator.js'
import {Data} from '../Data.js'
import {DATA_INDEX, DATA_INDEX_MODAL, DATA_NEXT, DATA_PREV} from '../enums/CustomIds.enum.js'
import {AfterQaData} from '../types/data.type.js'

class DataPageInteraction extends PaginatorHandler {
    protected runPrev({interaction, data}: ButtonPageOptions<AfterQaData>) {
        const {userId, channelId, after, page, size} = data
        return new Data(interaction).run(userId, channelId, after, this.prev(page, size))
    }
    protected runNext({interaction, data}: ButtonPageOptions<AfterQaData>) {
        const {userId, channelId, after, page, size} = data
        return new Data(interaction).run(userId, channelId, after, this.next(page, size))
    }
    protected runFields({interaction, fields, data}: ModalPageOptions<AfterQaData>) {
        const {userId, channelId, after, size} = data
        return new Data(interaction).run(userId, channelId, after, this.getPage(interaction, fields, size))
    }
}

export default new DataPageInteraction(DATA_PREV, DATA_INDEX, DATA_NEXT, DATA_INDEX_MODAL)