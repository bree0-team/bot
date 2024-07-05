import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {RoleId} from '../../../../types/base.type.js'
import {Afk} from '../Afk.js'
import {AFK_ROLES_SELECT} from '../enums/CustomIds.enum.js'
import SettingsAfkManager from '../managers/settings-afk.manager.js'

class AfkRolesInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<RoleId>) {
        await SettingsAfkManager.createOrUpdate(interaction.guildId, {roles: values})
        return new Afk(interaction).run()
    }
}

export default new AfkRolesInteraction(AFK_ROLES_SELECT)