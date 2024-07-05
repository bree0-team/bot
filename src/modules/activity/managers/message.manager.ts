import {Collection} from 'discord.js'
import {ChannelId, GuildId, UserId} from '../../../types/base.type.js'
import {MessageModel} from '../models/message.model.js'
import {ChannelCounts, ChannelItems, UserCounts, UserItems} from '../types/items.type.js'
import {ActivityManager} from './activity.manager.js'

const collection = new Collection<number, MessageModel>()
class MessageManager extends ActivityManager<number, MessageModel> {
    private getChannels(
        collection: Collection<number, MessageModel>,
        page?: number,
        limit?: number
    ): ChannelItems {
        const channels: ChannelCounts[] = collection.map(i => ({channelId: i.channelId, count: 1}))
        return this.getResult<ChannelCounts, ChannelItems>(this.reduceChannel(channels), page, limit)
    }
    private getUsers(collection: Collection<number, MessageModel>, page?: number, limit?: number): UserItems {
        const users: UserCounts[] = collection.map(i => ({userId: i.userId, count: 1}))
        return this.getResult<UserCounts, UserItems>(this.reduceUser(users), page, limit)
    }
    findUser(guildId: GuildId, userId: UserId, after: Date, page?: number, limit?: number): ChannelItems {
        const allChannels = this.collection
            .filter(i => i.guildId === guildId && i.userId === userId && i.send >= after)
        return this.getChannels(allChannels, page, limit)
    }
    findUsers(guildId: GuildId, after: Date, page?: number, limit?: number): UserItems {
        const allUsers = this.collection
            .filter(i => i.guildId === guildId && i.send >= after)
        return this.getUsers(allUsers, page, limit)
    }
    findChannel(
        guildId: GuildId,
        channelId: ChannelId,
        after: Date,
        page?: number,
        limit?: number
    ): UserItems {
        const allUsers = this.collection
            .filter(i => i.guildId === guildId && i.channelId === channelId && i.send >= after)
        return this.getUsers(allUsers, page, limit)
    }
    findChannels(guildId: GuildId, after: Date, page?: number, limit?: number): ChannelItems {
        const allChannels = this.collection
            .filter(i => i.guildId === guildId && i.send >= after)
        return this.getChannels(allChannels, page, limit)
    }
}

export default new MessageManager(collection, MessageModel)