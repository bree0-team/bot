import _ from 'lodash'
import {ModalHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import SettingsXpManager from '../../managers/settings-xp.manager.js'
import {RewardRoleRecord} from '../../models/settings-xp.model.js'
import {REWARD_ADD_ROLE_MODAL, REWARD_ADD_ROLE_MODAL_VALUE} from '../enums/CustomIds.enum.js'
import {addRewardRole} from '../helpers/RewardRoleActions.js'
import {Rewards} from '../Rewards.js'
import {RewardRoleData} from '../types/data.type.js'

class AddInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<RewardRoleData>) {
        const {roleId} = data
        const value = fields.getTextInputValue(REWARD_ADD_ROLE_MODAL_VALUE)
        const xpManager = await SettingsXpManager.getOne(interaction.guildId)
        const rewardRole = _.clone(xpManager.rewardRole) as RewardRoleRecord
        addRewardRole(rewardRole, value, roleId)
        await SettingsXpManager.createOrUpdate(interaction.guildId, {rewardRole})
        return new Rewards(interaction).run(roleId)
    }
}

export default new AddInteraction(REWARD_ADD_ROLE_MODAL)