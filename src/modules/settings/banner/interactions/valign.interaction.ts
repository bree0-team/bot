import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {ITEM_BOTTOM, ITEM_MIDDLE, ITEM_TOP} from '../enums/CustomIds.enum.js'
import {ItemType} from '../ItemType.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BannerData, ValignType} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'

class ValignInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<BannerItemData>) {
        const {itemId} = data
        let valign: ValignType;
        switch (interaction.customId) {
            case ITEM_MIDDLE: valign = ValignType.Middle; break
            case ITEM_BOTTOM: valign = ValignType.Bottom; break
            default: valign = ValignType.Top; break
        }
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerData>(itemId)
        const positionData: BannerData = {...bannerManager.data, valign}
        await SettingsBannerDataManager.update(itemId, positionData)
        return new ItemType(interaction).run(itemId, positionData.type)
    }
}

export default new ValignInteraction([ITEM_TOP, ITEM_MIDDLE, ITEM_BOTTOM])