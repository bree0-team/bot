import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {RoleId} from '../../../../../types/base.type.js'
import SettingsBannerDataManager from '../../managers/settings-banner-data.manager.js'
import {BannerMembersInRoleData} from '../../types/banner.type.js'
import {BannerItemData} from '../../types/data.type.js'
import {ROLES_SELECT} from '../enums/CustomIds.enum.js'
import {MembersInRole} from '../MembersInRole.js'

class RoleInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<RoleId, BannerItemData>
    ) {
        const {itemId} = data
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerMembersInRoleData>(itemId)
        const managerData: BannerMembersInRoleData = {...bannerManager.data, roles: values}
        await SettingsBannerDataManager.update(itemId, managerData)
        return new MembersInRole(interaction).run(itemId)
    }
}

export default new RoleInteraction(ROLES_SELECT)