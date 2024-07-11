import {Collection} from 'discord.js'
import {ModelManager} from '../../../managers/model.js'
import {GuildId, UserId} from '../../../types/base.type.js'
import {CreateClanMemberDto} from '../dto/clan-member/create-clan-member.dto.js'
import {UpdateClanMemberDto} from '../dto/clan-member/update-clan-member.dto.js'
import {ClanMemberModel} from '../models/clan-member.model.js'
import {ClanId, ClanMemberId} from '../types/clan.type.js'

const collection = new Collection<ClanMemberId, ClanMemberModel>()

class ClanMemberManager extends ModelManager<ClanMemberId, ClanMemberModel> {
    create = (guildId: GuildId, clanId: ClanId, dto: CreateClanMemberDto): Promise<ClanMemberModel> =>
        super.$create({guildId, clanId, ...dto})
    update = (clanId: ClanId, userId: UserId, dto: UpdateClanMemberDto): Promise<ClanMemberModel> =>
        super.$update(this.findOne(clanId, userId), dto)
    findAllByClanId = (clanId: ClanId): Collection<ClanMemberId, ClanMemberModel> =>
        this.collection.filter(i => i.clanId === clanId)
    findOne = (clanId: ClanId, userId: UserId): ClanMemberModel|undefined =>
        this.collection.find(i => i.clanId === clanId && i.userId === userId)
    findOneByGuildId = (guildId: GuildId, userId: UserId): ClanMemberModel|undefined =>
        this.collection.find(i => i.guildId === guildId && i.userId === userId)
    async remove(clanId: ClanId, userId: UserId): Promise<boolean> {
        const memberKey = this.resolveId(this.findOne(clanId, userId))
        return super.$remove(memberKey, {clanId, userId})
    }
    async removeAll(clanId: ClanId): Promise<boolean[]> {
        await this.model.destroy({where: {clanId}})
        return this.findAllByClanId(clanId)
            .map(i => this.collection.delete(i.id))
    }
}

export default new ClanMemberManager(collection, ClanMemberModel)