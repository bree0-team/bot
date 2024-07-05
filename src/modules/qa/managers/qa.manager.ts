import {Collection} from 'discord.js'
import {ModelManager} from '../../../managers/model.js'
import {ChannelId, GuildId, MessageId} from '../../../types/base.type.js'
import {CreateQaDto} from '../dto/create-qa.dto.js'
import {UpdateQaDto} from '../dto/update-qa.dto.js'
import {QaModel} from '../models/qa.model.js'

const collection = new Collection<number, QaModel>()

class QaManager extends ModelManager<number, QaModel> {
    create = (
        guildId: GuildId,
        channelId: ChannelId,
        messageId: MessageId,
        userId: MessageId,
        dto: CreateQaDto
    ): Promise<QaModel> => super.$create({guildId, channelId, messageId, userId, ...dto})
    update = (modelId: number, dto: UpdateQaDto): Promise<QaModel> => super.$update(this.findOne(modelId), dto)
    findOne = (modelId: number): QaModel | undefined  => super.$findOne(modelId)
    findAllByMessageId = (messageId: MessageId) => this.collection.filter(i => i.messageId === messageId)
    async removeAll(messageId: MessageId): Promise<boolean[]> {
        await this.model.destroy({
            where: {messageId}
        })
        const items = this.collection.filter(i => i.messageId === messageId)
        return items.map(i => this.collection.delete(i[this.key]))
    }
}

export default new QaManager(collection, QaModel)