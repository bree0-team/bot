import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {RoleId} from '../../../../types/base.type.js'
import {ROLES_ROLES} from '../enums/CustomIds.enum.js'
import SettingsRolesManager from '../managers/settings-roles.manager.js'
import {Roles} from '../Roles.js'
import {RolesData} from '../types/data.type.js'

class RolesInteraction extends PrivateHandler {
    protected async runValues(
        {interaction, values, data}: SelectManyValuesHandlerOptions<RoleId, RolesData>
    ) {
        const {roleId} = data
        await (values.length
            ? SettingsRolesManager.createOrUpdate(interaction.guildId, roleId, {roles: values})
            : SettingsRolesManager.remove(interaction.guildId, roleId)
        )
        return new Roles(interaction).run(roleId)
    }
}

export default new RolesInteraction(ROLES_ROLES)