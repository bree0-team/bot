import {Collection} from 'discord.js'
import {ChannelId, GuildId, MessageId, UserId} from '../../../types/base.type.js'
import {MessageDto} from '../dto/message.dto.js'
import MessageManager from '../managers/message.manager.js'
import {MessageModel} from '../models/message.model.js'

const collection = new Collection<MessageId, MessageDto>()

class _MessageSendService {
    constructor(private readonly collection: Collection<string, MessageDto>) {}
    set = (
        messageId: MessageId,
        guildId: GuildId,
        channelId: ChannelId,
        userId: UserId,
        send: Date
    ): Collection<string, MessageDto> => this.collection.set(messageId, {guildId, channelId, userId, send})
    sendsAll(): Promise<MessageModel[]> {
        const dto: MessageDto[] = this.collection.map((i, messageId) => {
            this.collection.delete(messageId)
            return i
        })
        return MessageManager.createMany(dto)
    }
}

export const MessageSendService = new _MessageSendService(collection)