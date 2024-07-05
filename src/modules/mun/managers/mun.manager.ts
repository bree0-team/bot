import {Collection} from 'discord.js'
import {ModelManager} from '../../../managers/model.js'
import {ChannelId, GuildId, MessageId} from '../../../types/base.type.js'
import {CreateMunDto} from '../dto/create-mun.dto.js'
import {UpdateMunDto} from '../dto/update-mun.dto.js'
import {MunModel} from '../models/mun.model.js'

const collection = new Collection<MessageId, MunModel>()

class MunManager extends ModelManager<MessageId, MunModel> {
    create = (guildId: GuildId, channelId: ChannelId, messageId: MessageId, dto: CreateMunDto): Promise<MunModel> =>
        super.$create({guildId, channelId, messageId, ...dto})
    update = (messageId: MessageId, dto: UpdateMunDto): Promise<MunModel> =>
        super.$update(this.findOne(messageId), dto)
    findOne = (messageId: MessageId): MunModel | undefined  => super.$findOne(messageId)
}

export default new MunManager(collection, MunModel, 'messageId')