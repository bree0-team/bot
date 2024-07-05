import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../handlers/interaction.js'
import {RoleId} from '../../../../types/base.type.js'
import {ROLES_ROLE} from '../enums/CustomIds.enum.js'
import {Roles} from '../Roles.js'

class RoleInteraction extends PrivateHandler {
    protected runValue = ({interaction, value}: SelectOneValueHandlerOptions<RoleId>) => new Roles(interaction).run(value)
}

export default new RoleInteraction(ROLES_ROLE)