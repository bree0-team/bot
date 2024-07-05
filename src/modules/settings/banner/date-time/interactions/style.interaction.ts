import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import SettingsBannerDataManager from '../../managers/settings-banner-data.manager.js'
import {BannerDateTimeData, DateTimeStyles} from '../../types/banner.type.js'
import {BannerItemData} from '../../types/data.type.js'
import {DateTime} from '../DateTime.js'
import {STYLES_SELECT} from '../enums/CustomIds.enum.js'

class StyleInteraction extends PrivateHandler {
    protected async runValue(
        {interaction, value, data}: SelectOneValueHandlerOptions<DateTimeStyles, BannerItemData>
    ) {
        const {itemId} = data
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerDateTimeData>(itemId)
        const managerData: BannerDateTimeData = {...bannerManager.data, style: value}
        await SettingsBannerDataManager.update(itemId, managerData)
        return new DateTime(interaction).run(itemId)
    }
}

export default new StyleInteraction(STYLES_SELECT)