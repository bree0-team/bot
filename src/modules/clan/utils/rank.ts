import {GuildId, UserId} from '../../../types/base.type.js'
import {ClanRank} from '../enums/ClanRank.enum.js'
import ClanMemberManager from '../managers/clan-member.manager.js'
import {ClanMemberModel} from '../models/clan-member.model.js'

export class RankUtils {
    static isOwner(guildId: GuildId, userId: UserId): boolean {
        const member = RankUtils.checkMember(guildId, userId)
        return member && member.rank === ClanRank.OWNER
    }
    static isChief(guildId: GuildId, userId: UserId): boolean {
        const member = RankUtils.checkMember(guildId, userId)
        return member && [ClanRank.OWNER, ClanRank.CHIEF].includes(member.rank)
    }
    static isCaptain(guildId: GuildId, userId: UserId): boolean {
        const member = RankUtils.checkMember(guildId, userId)
        return member && ![ClanRank.RECRUITER, ClanRank.MEMBER].includes(member.rank)
    }
    static isRecruiter(guildId: GuildId, userId: UserId): boolean {
        const member = RankUtils.checkMember(guildId, userId)
        return member && member.rank !== ClanRank.RECRUITER
    }
    static isMember = (guildId: GuildId, userId: UserId): boolean => !!RankUtils.checkMember(guildId, userId)

    static checkMember = (guildId: GuildId, userId: UserId): ClanMemberModel | undefined =>
        ClanMemberManager.findOneByGuildId(guildId, userId)
}