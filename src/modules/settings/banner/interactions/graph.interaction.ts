import _ from 'lodash'
import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {SplitUtils} from '../../../../utils/split.js'
import {
    defaultMaxScale,
    defaultMaxX,
    defaultMaxY,
    defaultMinScale,
    defaultMinX,
    defaultMinY
} from '../constants/defaults.js'
import {
    ITEM_EDIT_MODAL,
    ITEM_EDIT_MODAL_COLOR,
    ITEM_EDIT_MODAL_SCALE,
    ITEM_EDIT_MODAL_X,
    ITEM_EDIT_MODAL_Y
} from '../enums/CustomIds.enum.js'
import {GraphScaleMinMaxError, GraphXMinMaxError, GraphYMinMaxError} from '../errors/banner.error.js'
import {ItemType} from '../ItemType.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BannerData} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'

class GraphInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<BannerItemData>) {
        const x = _.toInteger(fields.getTextInputValue(ITEM_EDIT_MODAL_X)) as number
        const y = _.toInteger(fields.getTextInputValue(ITEM_EDIT_MODAL_Y)) as number
        const scale = _.toInteger(fields.getTextInputValue(ITEM_EDIT_MODAL_SCALE)) as number
        const valueColor = fields.getTextInputValue(ITEM_EDIT_MODAL_COLOR)
        if (defaultMinX > x && x > defaultMaxX) throw new GraphXMinMaxError(interaction)
        if (defaultMinY > y && y > defaultMaxY) throw new GraphYMinMaxError(interaction)
        if (defaultMinScale > scale && scale > defaultMaxScale) throw new GraphScaleMinMaxError(interaction)
        const {itemId} = data
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerData>(itemId)
        const graphData: BannerData = {
            ...bannerManager.data, x, y, scale,
            color: SplitUtils.hexToDecimal(valueColor)
        }
        await SettingsBannerDataManager.update(itemId, graphData)
        return new ItemType(interaction).run(itemId, graphData.type)
    }
}

export default new GraphInteraction(ITEM_EDIT_MODAL)