import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {ITEM_CENTER, ITEM_LEFT, ITEM_RIGHT} from '../enums/CustomIds.enum.js'
import {ItemType} from '../ItemType.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BannerData, AlignType} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'

class AlignInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<BannerItemData>) {
        const {itemId} = data
        let align: AlignType;
        switch (interaction.customId) {
            case ITEM_CENTER: align = AlignType.Center; break
            case ITEM_RIGHT: align = AlignType.Right; break
            default: align = AlignType.Left; break
        }
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerData>(itemId)
        const positionData: BannerData = {...bannerManager.data, align}
        await SettingsBannerDataManager.update(itemId, positionData)
        return new ItemType(interaction).run(itemId, positionData.type)
    }
}

export default new AlignInteraction([ITEM_LEFT, ITEM_CENTER, ITEM_RIGHT])