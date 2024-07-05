import {PrivateHandler, SelectOneValueHandlerOptions} from '../../../../../handlers/interaction.js'
import {RewardType} from '../../enums/RewardType.enum.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {REWARD_TYPE} from '../enums/CustomIds.enum.js'
import {Rewards} from '../Rewards.js'
import {RewardRoleData} from '../types/data.type.js'

class TypeInteraction extends PrivateHandler {
    protected async runValue(
        {interaction, value, data}: SelectOneValueHandlerOptions<RewardType, RewardRoleData>
    ) {
        const {roleId} = data
        await SettingsXpManager.createOrUpdate(interaction.guildId, {rewardType: value})
        return new Rewards(interaction).run(roleId)
    }
}

export default new TypeInteraction(REWARD_TYPE)