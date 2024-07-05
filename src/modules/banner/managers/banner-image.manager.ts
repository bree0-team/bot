import {Collection, Guild} from 'discord.js'
import {GuildId} from '../../../types/base.type.js'

interface BannerImageData {
    attachment: Buffer
    updatedAt: Date
}

const collection = new Collection<GuildId, BannerImageData>()
class _BannerImageManager {
    constructor(private readonly collection: Collection<GuildId, BannerImageData>) {}
    set = (guildId: GuildId, data: BannerImageData) => this.collection.set(guildId, data)
    findOne = (guildId: GuildId) => this.collection.get(guildId)
}

export const BannerImageManager = new _BannerImageManager(collection)