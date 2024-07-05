import {ButtonHandlerOptions, PrivateHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {Banner} from '../Banner.js'
import {ITEMS_SELECT} from '../enums/CustomIds.enum.js'
import {ItemType} from '../ItemType.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'

class BannerInteraction extends PrivateHandler {
    protected run = ({interaction}: ButtonHandlerOptions) => new Banner(interaction).run()
    protected runValue({interaction, value}: SelectOneValueHandlerOptions) {
        const itemId = Number(value)
        const bannerManager = SettingsBannerDataManager.findOne(itemId)
        return new ItemType(interaction).run(itemId, bannerManager.data.type)
    }
}

export default new BannerInteraction(ITEMS_SELECT)