import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import SettingsBannerDataManager from '../../managers/settings-banner-data.manager.js'
import {BannerChannelsData, BannerChannelsType} from '../../types/banner.type.js'
import {BannerItemData} from '../../types/data.type.js'
import {Channels} from '../Channels.js'
import {CHANNELS_TYPES} from '../enums/CustomIds.enum.js'

class TypesInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<BannerChannelsType, BannerItemData>
    ) {
        const {itemId} = data
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerChannelsData>(itemId)
        const managerData: BannerChannelsData = {...bannerManager.data, channelTypes: values}
        await SettingsBannerDataManager.update(itemId, managerData)
        return new Channels(interaction).run(itemId)
    }
}

export default new TypesInteraction(CHANNELS_TYPES)