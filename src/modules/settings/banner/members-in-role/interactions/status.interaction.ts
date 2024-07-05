import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import SettingsBannerDataManager from '../../managers/settings-banner-data.manager.js'
import {BannerMembersWithStatusData, BannerMembersWithStatusType} from '../../types/banner.type.js'
import {BannerItemData} from '../../types/data.type.js'
import {STATUS_SELECT} from '../enums/CustomIds.enum.js'
import {MembersInRole} from '../MembersInRole.js'

class StatusInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<BannerMembersWithStatusType, BannerItemData>
    ) {
        const {itemId} = data
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerMembersWithStatusData>(itemId)
        const managerData: BannerMembersWithStatusData = {...bannerManager.data, statuses: values}
        await SettingsBannerDataManager.update(itemId, managerData)
        return new MembersInRole(interaction).run(itemId)
    }
}

export default new StatusInteraction(STATUS_SELECT)