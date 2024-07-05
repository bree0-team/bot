import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {RoleId} from '../../../../../types/base.type.js'
import {Create} from '../Create.js'
import {CREATE_ALLOWED_ROLES} from '../enums/CustomIds.enum.js'
import SettingsClanCreateManager from '../managers/settings-clan-create.manager.js'

class CreateAllowedRolesInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<RoleId>) {
        await SettingsClanCreateManager.createOrUpdate(interaction.guildId, {roles: values})
        return new Create(interaction).run()
    }
}

export default new CreateAllowedRolesInteraction(CREATE_ALLOWED_ROLES)