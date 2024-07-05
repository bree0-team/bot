import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {RoleId} from '../../../../../types/base.type.js'
import SettingsQaManager from '../../managers/settings-qa.manager.js'
import {QaData} from '../../types/data.type.js'
import {QA_ROLES} from '../enums/CustomIds.enum.js'
import {Roles} from '../Roles.js'

class RolesInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<RoleId, QaData>
    ) {
        const {channelId} = data
        await SettingsQaManager.createOrUpdate(interaction, channelId, {roles: values})
        return new Roles(interaction).run(channelId)
    }
}

export default new RolesInteraction(QA_ROLES)