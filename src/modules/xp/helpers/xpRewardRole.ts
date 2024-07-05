import {GuildMember} from 'discord.js'
import {GuildId, RoleId} from '../../../types/base.type.js'
import {RewardType} from '../../settings/xp/enums/RewardType.enum.js'
import SettingsXpManager from '../../settings/xp/managers/settings-xp.manager.js'
import XpManager from '../managers/xp.manager.js'
import {XpModel} from '../models/xp.model.js'
import {XpUtils} from '../utils/xp.js'

export async function xpRewardRole(guildId: GuildId, member: GuildMember): Promise<XpModel> {
    const userXp = XpManager.findOne(guildId, member.id)
    if (!userXp) return;
    const {rewardRole, rewardType} = await SettingsXpManager.getOne(guildId)
    if (!Object.values(rewardRole).length) return;
    const level = new XpUtils(guildId).getTotalXp(userXp.value)
    if (level === 0) return;
    if (userXp.level === level) return;

    const boxAdd: RoleId[] = []
    const boxDel: RoleId[] = []

    for (const [lvl, roleIds] of Object.entries(rewardRole)) {
        if (level === Number(lvl)) boxAdd.push(...roleIds)
        else boxDel.push(...roleIds)
    }

    if (boxAdd.length) member.roles.add(boxAdd)
    if (boxDel.length && boxAdd.length && rewardType === RewardType.REMOVED) member.roles.remove(boxDel)

    return XpManager.update(guildId, member.id, {level})
}