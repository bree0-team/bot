import {Collection} from 'discord.js'
import {ModelManager} from '../../../../managers/model.js'
import {GuildId} from '../../../../types/base.type.js'
import ClanMemberManager from '../../managers/clan-member.manager.js'
import {ClanId, ClanRoleId} from '../../types/clan.type.js'
import {CreateClanRoleDto} from '../dto/create-clan-role.dto.js'
import {UpdateClanRoleDto} from '../dto/update-clan-role.dto.js'
import {ClanRoleModel} from '../models/clan-role.model.js'

const collection = new Collection<ClanRoleId, ClanRoleModel>()
class ClanRoleManager extends ModelManager<ClanRoleId, ClanRoleModel> {
    create = (guildId: GuildId, clanId: ClanId, dto: CreateClanRoleDto): Promise<ClanRoleModel> =>
        super.$create({guildId, clanId, ...dto})
    update = (clanRoleId: ClanRoleId, dto: UpdateClanRoleDto): Promise<ClanRoleModel> =>
        super.$update(this.$findOne(clanRoleId), dto)
    findOne = (clanRoleId: ClanRoleId): ClanRoleModel | undefined => super.$findOne(clanRoleId)
    findOneDefault = (clanId: ClanId): ClanRoleModel | undefined =>
        this.collection.find(i => i.clanId === clanId && i.isDefault)
    async remove(clanId: ClanId, clanRoleId: ClanRoleId): Promise<boolean> {
        const defRole = this.findOneDefault(clanId)
        await Promise.all(ClanMemberManager.findAll()
            .filter(i => i.clanRoleId === clanRoleId)
            .map(i => {
                i.clanRoleId = defRole.id
                return i.save()
            }))
        return super.$remove(clanRoleId, {id: clanRoleId})
    }
    async removeAll(clanId: ClanId): Promise<boolean[]> {
        await this.model.destroy({where: {clanId}})
        return this.findAll()
            .filter(i => i.clanId === clanId)
            .map(i => this.collection.delete(i.id))
    }
}

export default new ClanRoleManager(collection, ClanRoleModel)