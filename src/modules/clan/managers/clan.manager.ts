import {Collection} from 'discord.js'
import {ModelManager} from '../../../managers/model.js'
import {GuildId} from '../../../types/base.type.js'
import {CreateClanDto} from '../dto/clan/create-clan.dto.js'
import {UpdateClanDto} from '../dto/clan/update-clan.dto.js'
import {ClanModel} from '../models/clan.model.js'
import ClanRoleManager from '../role/managers/clan-role.manager.js'
import {ClanId} from '../types/clan.type.js'
import ClanMemberManager from './clan-member.manager.js'

const collection = new Collection<ClanId, ClanModel>()

class ClanManager extends ModelManager<ClanId, ClanModel> {
    create = (guildId: GuildId, dto: CreateClanDto): Promise<ClanModel> => super.$create({guildId, ...dto})
    update = (clanId: ClanId, dto: UpdateClanDto): Promise<ClanModel> => super.$update(this.findOne(clanId), dto)
    findOne = (clanId: ClanId): ClanModel | undefined => super.$findOne(clanId)
    findAllByGuildId = (guildId: GuildId): Collection<ClanId, ClanModel> => super.findAll()
        .filter(i => i.guildId === guildId)
    async remove(clanId: ClanId): Promise<boolean> {
        await ClanMemberManager.removeAll(clanId)
        await ClanRoleManager.removeAll(clanId)
        return super.$remove(clanId, {id: clanId})
    }
}

export default new ClanManager(collection, ClanModel)