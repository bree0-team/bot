import {ClientUser, OverwriteResolvable, OverwriteType, PermissionFlagsBits} from 'discord.js'
import {GuildId} from '../../../../types/base.type.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import {ClanId} from '../../types/clan.type.js'

export function voiceChannelOverwrite(clientUser: ClientUser, guildId: GuildId, clanId: ClanId): OverwriteResolvable[] {
    const memberManager = ClanMemberManager.findAllByClanId(clanId)
    return [{
        id: clientUser.id,
        allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.ManageChannels,
            PermissionFlagsBits.ManageRoles,
            PermissionFlagsBits.Connect,
            PermissionFlagsBits.SendMessages
        ],
        type: OverwriteType.Member
    }, {
        id: guildId,
        allow: [PermissionFlagsBits.ViewChannel],
        deny: [PermissionFlagsBits.Connect, PermissionFlagsBits.SendMessages],
        type: OverwriteType.Role
    }, ...memberManager.map(member => ({
        id: member.userId,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect],
        deny: [PermissionFlagsBits.SendMessages],
        type: OverwriteType.Member
    }))]
}

export function textChannelOverwrite(clientUser: ClientUser, guildId: GuildId, clanId: ClanId): OverwriteResolvable[] {
    const memberManager = ClanMemberManager.findAllByClanId(clanId)
    return [{
        id: clientUser.id,
        allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.ManageChannels,
            PermissionFlagsBits.ManageRoles,
            PermissionFlagsBits.SendMessages
        ],
        type: OverwriteType.Member
    }, {
        id: guildId,
        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
        type: OverwriteType.Role
    }, ...memberManager.map(member => ({
        id: member.userId,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
        type: OverwriteType.Member
    }))]
}