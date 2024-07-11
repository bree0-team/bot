import {Collection} from 'discord.js'
import {ModelManager} from '../../../../managers/model.js'
import {ClanId} from '../../types/clan.type.js'
import {ClanAdCooldownModel} from '../models/clan-ad-cooldown.model.js'

const collection = new Collection<ClanId, ClanAdCooldownModel>()

class ClanAdCooldownManager extends ModelManager<ClanId, ClanAdCooldownModel> {
    createOrUpdate = (clanId: ClanId): Promise<ClanAdCooldownModel> =>
        super.$createOrUpdate(this.findOne(clanId), {clanId, updatedAt: new Date()})
    findOne = (clanId: ClanId): ClanAdCooldownModel | undefined => super.$findOne(clanId)
    remove = (clanId: ClanId): Promise<boolean> => super.$remove(clanId, {clanId})
}

export default new ClanAdCooldownManager(collection, ClanAdCooldownModel)