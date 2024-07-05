import {
    Guild,
    OverwriteData,
    OverwriteType,
    PermissionOverwrites,
    PermissionsBitField,
    TextChannel,
    VoiceChannel
} from 'discord.js'
import {UserId} from '../../../../types/base.type.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import {ClanId} from '../../types/clan.type.js'
import {defaultClanGuestRight, defaultClanMemberRight, defaultNotEveryoneRight} from '../constants/defaults.js'
import ClanChannelManager from '../managers/clan-channel.manager.js'
import {UserRight} from '../user-rights/enums/UserRight.enum.js'

export class RightsUtils {
    static addUsers(
        channel: TextChannel | VoiceChannel,
        userIds: UserId[],
        bitType: UserRight,
        overwriteType: OverwriteType = OverwriteType.Member
    ): Promise<TextChannel | VoiceChannel> {
        const clanChannelManager = ClanChannelManager.findOne(channel.id)
        const overwrites: OverwriteData[] = channel.permissionOverwrites.cache
            .map(i => i)
        const bitField = new PermissionsBitField(BigInt(clanChannelManager[bitType]))
            .toArray()
            .map(i => ({[i]: true}))
            .reduce((prev, current) => ({...prev, ...current}), {})
        overwrites.push(...userIds.map(userId => {
            const {allow, deny} = PermissionOverwrites
                .resolveOverwriteOptions(bitField, {})
            return {id: userId, type: overwriteType, allow, deny}
        }))
        return channel.edit({permissionOverwrites: overwrites})
    }
    static async addUsersToAllChannels(
        guild: Guild,
        clanId: ClanId,
        userIds: UserId[],
        bitType: UserRight
    ): Promise<void> {
        const clanChannelManager = ClanChannelManager.findAllByClanId(clanId)
        clanChannelManager.map(model => guild.channels
            .resolve(model.channelId) as (TextChannel | VoiceChannel))
            .map(channel => RightsUtils.addUsers(channel, userIds, bitType))
    }
    static removeUsers(channel: TextChannel | VoiceChannel, userIds: UserId[]): Promise<TextChannel | VoiceChannel> {
        const overwrites: OverwriteData[] = channel.permissionOverwrites.cache
            .map(i => i)
            .filter(i => !userIds.includes(i.id))
        return channel.edit({permissionOverwrites: overwrites})
    }
    static async removeUsersFromAllChannels(guild: Guild, clanId: ClanId, userIds: UserId[]): Promise<void> {
        const clanChannelManager = ClanChannelManager.findAllByClanId(clanId)
        clanChannelManager.map(model => guild.channels
            .resolve(model.channelId) as (TextChannel | VoiceChannel))
            .map(channel => RightsUtils.removeUsers(channel, userIds))
    }
    static async updateUserRights(
        channel: TextChannel | VoiceChannel,
        right: UserRight,
        bigPermission: bigint,
        overwriteType: OverwriteType = OverwriteType.Member
    ): Promise<TextChannel | VoiceChannel> {
        const clanChannelManager = await ClanChannelManager.update(channel.id, {[right]: bigPermission})
        const clanMembersManager: UserId[] = ClanMemberManager.findAllByClanId(clanChannelManager.clanId)
            .map(i => i.userId)
        const bitField = new PermissionsBitField(bigPermission).toArray()
        const clanBitField = bitField.map(i => ({[i]: true}))
            .reduce((prev, current) => ({...prev, ...current}), {})
        const everyoneBitField = bitField.map(i => ({[i]: false}))
            .reduce((prev, current) => ({...prev, ...current}), {})
        const overwrites: OverwriteData[] = channel.permissionOverwrites.cache
            .map(i => {
                if (channel.client.user.id === i.id) return i
                if (right === UserRight.clanMember && clanMembersManager.includes(i.id)) {
                    const {allow, deny} = PermissionOverwrites
                        .resolveOverwriteOptions(clanBitField, {deny: defaultClanMemberRight})
                    return {id: i.id, type: overwriteType, allow, deny}
                }
                if (right === UserRight.clanGuest && !clanMembersManager.includes(i.id) && channel.guildId !== i.id) {
                    const {allow, deny} = PermissionOverwrites
                        .resolveOverwriteOptions(clanBitField, {deny: defaultClanGuestRight})
                    return {id: i.id, type: overwriteType, allow, deny}
                }
                if (right === UserRight.everyone && channel.guildId === i.id) {
                    const {allow, deny} = PermissionOverwrites
                        .resolveOverwriteOptions(everyoneBitField, {allow: defaultNotEveryoneRight})
                    return {id: i.id, type: overwriteType, allow, deny}
                }
                return i
            })
        return channel.edit({permissionOverwrites: overwrites})
    }
}