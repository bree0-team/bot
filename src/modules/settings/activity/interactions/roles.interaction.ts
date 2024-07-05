import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../handlers/interaction.js'
import {RoleId} from '../../../../types/base.type.js'
import {Activity} from '../Activity.js'
import {ACTIVITY_ROLES} from '../enums/CustomIds.enum.js'
import SettingsActivityManager from '../managers/settings-activity.manager.js'

class RolesInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<RoleId>) {
        await SettingsActivityManager.createOrUpdate(interaction.guildId, {roles: values})
        return new Activity(interaction).run()
    }
}

export default new RolesInteraction(ACTIVITY_ROLES)