import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import SettingsBannerDataManager from '../../managers/settings-banner-data.manager.js'
import {BannerMembersInRoleData, BannerMembersWithStatusType} from '../../types/banner.type.js'
import {BannerItemData} from '../../types/data.type.js'
import {STATUS_SELECT} from '../enums/CustomIds.enum.js'
import {MembersWithStatus} from '../MembersWithStatus.js'

class StatusInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<BannerMembersWithStatusType, BannerItemData>
    ) {
        const {itemId} = data
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerMembersInRoleData>(itemId)
        const managerData: BannerMembersInRoleData = {...bannerManager.data, statuses: values}
        await SettingsBannerDataManager.update(itemId, managerData)
        return new MembersWithStatus(interaction).run(itemId)
    }
}

export default new StatusInteraction(STATUS_SELECT)