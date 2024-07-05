import _ from 'lodash'
import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {RewardRoleRecord} from '../../models/settings-xp.model.js'
import {REWARD_DEL_ROLE} from '../enums/CustomIds.enum.js'
import {deleteRewardRole} from '../helpers/RewardRoleActions.js'
import {Rewards} from '../Rewards.js'
import {RewardRoleData} from '../types/data.type.js'

class DeleteInteraction extends PrivateHandler {
    protected async run({interaction, data}: ButtonHandlerOptions<RewardRoleData>) {
        const {roleId} = data
        const xpManager = await SettingsXpManager.getOne(interaction.guildId)
        const rewardRole = _.clone(xpManager.rewardRole) as RewardRoleRecord
        deleteRewardRole(rewardRole, roleId)
        await SettingsXpManager.createOrUpdate(interaction.guildId, {rewardRole})
        return new Rewards(interaction).run(roleId)
    }
}

export default new DeleteInteraction(REWARD_DEL_ROLE)