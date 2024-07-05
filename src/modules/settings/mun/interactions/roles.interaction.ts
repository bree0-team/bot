import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {RoleId} from '../../../../types/base.type.js'
import {MUN_ROLES} from '../enums/CustomIds.enum.js'
import SettingsMunManager from '../managers/settings-mun.manager.js'
import {Mun} from '../Mun.js'

class RolesInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<RoleId>) {
        await SettingsMunManager.createOrUpdate(interaction.guildId, {roles: values})
        return new Mun(interaction).run()
    }
}

export default new RolesInteraction(MUN_ROLES)