import {Collection} from 'discord.js'
import {ModelManager} from '../../../managers/model.js'
import {GuildId, UserId} from '../../../types/base.type.js'
import {UpdateXpDto} from '../dto/update-xp.dto.js'
import {XpDto} from '../dto/xp.dto.js'
import {XpModel} from '../models/xp.model.js'

const collection = new Collection<string, XpModel>()

class XpManager extends ModelManager<string, XpModel> {
    createMany = (dto: XpDto[], onDuplicateKeysUpdate: (keyof Omit<XpDto, 'id'>)[]): Promise<XpModel[] | undefined> =>
        super.$createMany(dto, onDuplicateKeysUpdate)
    update = (guildId: GuildId, userId: UserId, dto: UpdateXpDto): Promise<XpModel> =>
        super.$update(this.findOne(guildId, userId), dto)
    findOne = (guildId: GuildId, userId: UserId): XpModel | undefined => this.collection
        .find(i => i.guildId === guildId && i.userId === userId)
    findAllByGuildId = (guildId: GuildId): Collection<string, XpModel> =>
        this.collection.filter(i => i.guildId === guildId)
}

export default new XpManager(collection, XpModel)