import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import SettingsBannerDataManager from '../../managers/settings-banner-data.manager.js'
import {BannerMembersData, BannerMembersType} from '../../types/banner.type.js'
import {BannerItemData} from '../../types/data.type.js'
import {MEMBER_TYPE_SELECT} from '../enums/CustomIds.enum.js'
import {Members} from '../Members.js'

class TypeInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<BannerMembersType, BannerItemData>
    ) {
        const {itemId} = data
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerMembersData>(itemId)
        const managerData: BannerMembersData = {...bannerManager.data, memberTypes: values}
        await SettingsBannerDataManager.update(itemId, managerData)
        return new Members(interaction).run(itemId)
    }
}

export default new TypeInteraction(MEMBER_TYPE_SELECT)