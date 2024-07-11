import {Collection} from 'discord.js'
import {ModelManager} from '../../../../managers/model.js'
import {GuildId} from '../../../../types/base.type.js'
import {ClanId} from '../../types/clan.type.js'
import {CreateClanAdDto} from '../dto/create-clan-ad.dto.js'
import {UpdateClanAdDto} from '../dto/update-clan-ad.dto.js'
import {ClanAdModel} from '../models/clan-ad.model.js'

const collection = new Collection<number, ClanAdModel>()

class ClanAdManager extends ModelManager<number, ClanAdModel> {
    create(guildId: GuildId, clanId: ClanId, dto: CreateClanAdDto): Promise<ClanAdModel> {
        // todo: ValidationErrorItem
        const defaultDto: Omit<CreateClanAdDto, 'title'> = {
            fields: []
        }
        return super.$create({guildId, clanId, ...defaultDto, ...dto})
    }
    update = (clanAdId: number, dto: UpdateClanAdDto): Promise<ClanAdModel> => super.$update(this.findOne(clanAdId), dto)
    findAllByClanId = (clanId: ClanId): Collection<number, ClanAdModel> =>
        this.collection.filter(i => i.clanId === clanId)
    findOne = (clanAdId: number): ClanAdModel|undefined => super.$findOne(clanAdId)
    async remove(clanAdId: number): Promise<boolean> {
        const adKey = this.resolveId(clanAdId)
        return super.$remove(adKey, {id: clanAdId})
    }
    async removeAll(clanId: ClanId): Promise<boolean[]> {
        await this.model.destroy({where: {clanId}})
        return this.findAllByClanId(clanId)
            .map(i => this.collection.delete(i.id))
    }
}

export default new ClanAdManager(collection, ClanAdModel)