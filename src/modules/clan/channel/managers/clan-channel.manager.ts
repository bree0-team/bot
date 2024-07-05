import {Collection} from 'discord.js'
import {ModelManager} from '../../../../managers/model.js'
import {ChannelId, GuildId} from '../../../../types/base.type.js'
import {ClanId} from '../../types/clan.type.js'
import {CreateClanChannelDto} from '../dto/create-clan-channel.dto.js'
import {UpdateClanChannelDto} from '../dto/update-clan-channel.dto.js'
import {ClanChannelModel} from '../models/clan-channel.model.js'

const collection = new Collection<ChannelId, ClanChannelModel>()

class ClanChannelManager extends ModelManager<ChannelId, ClanChannelModel> {
    create = (
        guildId: GuildId,
        channelId: ChannelId,
        clanId: ClanId,
        dto: CreateClanChannelDto
    ): Promise<ClanChannelModel> => super.$create({guildId, channelId, clanId, ...dto})
    update = (channelId: ChannelId, dto: UpdateClanChannelDto): Promise<ClanChannelModel> =>
        super.$update(this.findOne(channelId), dto)
    findOne = (channelId: ChannelId): ClanChannelModel | undefined => super.$findOne(channelId)
    findAllByClanId = (clanId: ClanId): Collection<ChannelId, ClanChannelModel> =>
        this.collection.filter(i => i.clanId === clanId)
    findAllByGuildId = (guildId: GuildId): Collection<ChannelId, ClanChannelModel> =>
        this.collection.filter(i => i.guildId === guildId)
    remove = (channelId: ChannelId): Promise<boolean> => super.$remove(channelId, {channelId})
}

export default new ClanChannelManager(collection, ClanChannelModel, 'channelId')