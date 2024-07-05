import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {ItemType} from '../../ItemType.js'
import {BannerType} from '../../types/banner.type.js'
import {TYPES_SELECT} from '../enums/CustomIds.enum.js'

class TypeInteraction extends PrivateHandler {
    protected runValue = ({interaction, value}: SelectOneValueHandlerOptions<BannerType>) =>
        new ItemType(interaction).run(undefined, value)
}

export default new TypeInteraction(TYPES_SELECT)