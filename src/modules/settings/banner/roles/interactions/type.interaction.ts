import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import SettingsBannerDataManager from '../../managers/settings-banner-data.manager.js'
import {BannerRolesData, BannerRolesType} from '../../types/banner.type.js'
import {BannerItemData} from '../../types/data.type.js'
import {ROLE_TYPE_SELECT} from '../enums/CustomIds.enum.js'
import {Roles} from '../Roles.js'

class TypeInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<BannerRolesType, BannerItemData>
    ) {
        const {itemId} = data
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerRolesData>(itemId)
        const managerData: BannerRolesData = {...bannerManager.data, roleTypes: values}
        await SettingsBannerDataManager.update(itemId, managerData)
        return new Roles(interaction).run(itemId)
    }
}

export default new TypeInteraction(ROLE_TYPE_SELECT)