import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {RoleId} from '../../../../../types/base.type.js'
import {Create} from '../Create.js'
import {MANAGE_ALLOWED_ROLES} from '../enums/CustomIds.enum.js'
import SettingsClanManageManager from '../managers/settings-clan-manage.manager.js'

class CreateAllowedRolesInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<RoleId>) {
        await SettingsClanManageManager.createOrUpdate(interaction.guildId, {roles: values})
        return new Create(interaction).run()
    }
}

export default new CreateAllowedRolesInteraction(MANAGE_ALLOWED_ROLES)