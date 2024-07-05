import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {ITEM_CENTER, ITEM_LEFT, ITEM_RIGHT} from '../enums/CustomIds.enum.js'
import {ItemType} from '../ItemType.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BannerData, PositionType} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'

class PositionInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<BannerItemData>) {
        const {itemId} = data
        let position: PositionType;
        switch (interaction.customId) {
            case ITEM_CENTER:
                position = PositionType.Center
                break
            case ITEM_RIGHT:
                position = PositionType.Right
                break
            default:
                position = PositionType.Left
                break
        }
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerData>(itemId)
        const positionData: BannerData = {...bannerManager.data, position}
        await SettingsBannerDataManager.update(itemId, positionData)
        return new ItemType(interaction).run(itemId, positionData.type)
    }
}

export default new PositionInteraction([ITEM_LEFT, ITEM_CENTER, ITEM_RIGHT])