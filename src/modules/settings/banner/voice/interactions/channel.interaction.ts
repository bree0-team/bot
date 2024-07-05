import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {ChannelId} from '../../../../../types/base.type.js'
import SettingsBannerDataManager from '../../managers/settings-banner-data.manager.js'
import {BannerVoiceData} from '../../types/banner.type.js'
import {BannerItemData} from '../../types/data.type.js'
import {CHANNELS_SELECT} from '../enums/CustomIds.enum.js'
import {Voice} from '../Voice.js'

class ChannelInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<ChannelId, BannerItemData>
    ) {
        const {itemId} = data
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerVoiceData>(itemId)
        const managerData: BannerVoiceData = {...bannerManager.data, channels: values}
        await SettingsBannerDataManager.update(itemId, managerData)
        return new Voice(interaction).run(itemId)
    }
}

export default new ChannelInteraction(CHANNELS_SELECT)