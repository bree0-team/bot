import {ButtonHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {BannerImage} from '../../../banner/BannerImage.js'
import {Banner} from '../Banner.js'
import {ITEM_DELETE} from '../enums/CustomIds.enum.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BannerItemData} from '../types/data.type.js'

class DeleteInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<BannerItemData>) {
        const {itemId} = data
        await SettingsBannerDataManager.remove(itemId)
        await new BannerImage(interaction.guild).run(true)
        return new Banner(interaction).run()
    }
}

export default new DeleteInteraction(ITEM_DELETE)