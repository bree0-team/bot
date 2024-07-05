import {Collection} from 'discord.js'
import ClanRoleManager from '../role/managers/clan-role.manager.js'
import {ClanRoleModel} from '../role/models/clan-role.model.js'
import {ClanId, ClanRoleId} from '../types/clan.type.js'

export function sortedRoles(clanId: ClanId): Collection<ClanRoleId, ClanRoleModel> {
    const roles = ClanRoleManager.findAll()
        .filter(i => i.clanId === clanId)
    return roles.sort((a, b) => {
        if (a.isDefault === b.isDefault) return 0;
        if (b.isDefault !== null) return -1;
        return 1;
    })
}