import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {RoleId} from '../../../../../types/base.type.js'
import {REWARD_ROLES} from '../enums/CustomIds.enum.js'
import {Rewards} from '../Rewards.js'

class RoleInteraction extends PrivateHandler {
    protected runValue = ({interaction, value}: SelectOneValueHandlerOptions<RoleId>) =>
        new Rewards(interaction).run(value)
}

export default new RoleInteraction(REWARD_ROLES)