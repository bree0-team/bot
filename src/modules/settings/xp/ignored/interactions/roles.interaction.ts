import {PrivateHandler, SelectManyValuesHandlerOptions} from '../../../../../handlers/interaction.js'
import {RoleId} from '../../../../../types/base.type.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {XP_ROLES} from '../enums/CustomIds.enum.js'
import {Ignored} from '../Ignored.js'

class RolesInteraction extends PrivateHandler {
    protected async runValues({interaction, values}: SelectManyValuesHandlerOptions<RoleId>) {
        await SettingsXpManager.createOrUpdate(interaction.guildId, {roles: values})
        return new Ignored(interaction).run()
    }
}

export default new RolesInteraction(XP_ROLES)