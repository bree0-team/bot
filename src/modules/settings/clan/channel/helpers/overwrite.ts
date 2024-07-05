import {ClientUser, OverwriteResolvable, OverwriteType, PermissionFlagsBits} from 'discord.js'
import {GuildId} from '../../../../../types/base.type.js'

export const interfaceChannelOverwrite = (clientUser: ClientUser, guildId: GuildId): OverwriteResolvable[] => ([{
    id: clientUser.id,
    allow: [PermissionFlagsBits.SendMessages],
    type: OverwriteType.Member
}, {
    id: guildId,
    deny: [PermissionFlagsBits.SendMessages],
    type: OverwriteType.Role
}])