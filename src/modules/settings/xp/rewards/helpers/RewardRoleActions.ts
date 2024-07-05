import {RoleId} from '../../../../../types/base.type.js'
import {RewardRoleRecord} from '../../models/settings-xp.model.js'

export function addRewardRole(rewardRole: RewardRoleRecord, level: string, roleId: RoleId): void {
    if (!Object.keys(rewardRole).includes(level)) Object.assign(rewardRole, {[level]: []})
    rewardRole[level].push(roleId)
}

export function deleteRewardRole(rewardRole: RewardRoleRecord, roleId: RoleId): void {
    Object.entries(rewardRole).map(([level, roles]) => {
        const index = roles.indexOf(roleId)
        if (index >= 0) {
            roles.splice(index, 1)
            if (roles.length) rewardRole[level] = roles
            else delete rewardRole[level]
        }
    })
}