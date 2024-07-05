import {time} from 'discord.js'
import {GuildId} from '../../../../types/base.type.js'
import SettingsClanAdManager from '../../../settings/clan/ad/managers/settings-clan-ad.manager.js'
import {ClanId} from '../../types/clan.type.js'
import ClanAdCooldownManager from '../managers/clan-ad-cooldown.manager.js'

async function createCooldown(clanId: ClanId): Promise<boolean> {
    await ClanAdCooldownManager.createOrUpdate(clanId)
    return false
}

export async function adCooldown(guildId: GuildId, clanId: ClanId): Promise<boolean | string> {
    const down = ClanAdCooldownManager.findOne(clanId)
    if (!down) return createCooldown(clanId)
    const {cooldown} = await SettingsClanAdManager.getOne(guildId)
    const getTime = down.updatedAt.getTime() + (cooldown * 60 * 1000)
    if (getTime > new Date().getTime()) return time(Math.floor(getTime / 1000), 'R')
    return createCooldown(clanId)
}