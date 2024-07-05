import {ButtonPageOptions, ModalPageOptions, PaginatorHandler} from '../../../../../handlers/paginator.js'
import {AfterData} from '../../../types/data.type.js'
import {VOICES_INDEX, VOICES_INDEX_MODAL, VOICES_NEXT, VOICES_PREV} from '../enums/CustomIds.enum.js'
import {Voices} from '../Voices.js'

class VoicesPageInteraction extends PaginatorHandler {
    protected runPrev({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page, size} = data
        return new Voices(interaction).run(itemId, after, this.prev(page, size))
    }
    protected runNext({interaction, data}: ButtonPageOptions<AfterData>) {
        const {itemId, after, page, size} = data
        return new Voices(interaction).run(itemId, after, this.next(page, size))
    }
    protected runFields({interaction, fields, data}: ModalPageOptions<AfterData>) {
        const {itemId, after, size} = data
        return new Voices(interaction).run(itemId, after, this.getPage(interaction, fields, size))
    }
}

export default new VoicesPageInteraction(VOICES_PREV, VOICES_INDEX, VOICES_NEXT, VOICES_INDEX_MODAL)