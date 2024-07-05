import {Model} from 'sequelize-typescript'
import {CreationAttributes} from 'sequelize/types/model.js'
import {ModelManager} from '../../../managers/model.js'
import {ChannelId, UserId} from '../../../types/base.type.js'
import {AnyCounts, ChannelCounts, UserCounts} from '../types/items.type.js'

export abstract class ActivityManager<K, M extends Model> extends ModelManager<K, M> {
    private addCounts(acc: object | AnyCounts, itemId: string, count: number): AnyCounts {
        if (acc[itemId]) acc[itemId] += count
        else acc[itemId] = count
        return acc as AnyCounts
    }
    protected reduceUser(counts: UserCounts[]): UserCounts[] {
        const reduce: Record<UserId, number> = counts.reduce((acc, {userId, count}) =>
            this.addCounts(acc, userId, count), {})
        return Object.entries(reduce)
            .map(([userId, count]): UserCounts => ({userId, count}))
    }
    protected reduceChannel(counts: ChannelCounts[]): ChannelCounts[] {
        const reduce: Record<ChannelId, number> = counts.reduce((acc, {channelId, count}) =>
            this.addCounts(acc, channelId, count), {})
        return Object.entries(reduce)
            .map(([channelId, count]): ChannelCounts => ({channelId, count}))
    }
    protected getResult<C extends AnyCounts, I extends {items: C[], pages: number}>(
        counts: C[],
        page?: number,
        limit?: number
    ): I {
        const result = counts.sort((a, b) => b.count - a.count)
        if (page !== undefined && limit !== undefined)
            return {items: result.slice(page*limit, page*limit+limit), pages: Math.ceil(result.length/limit)} as I
        return {items: result, pages: 0} as I
    }
    createMany = (dto: CreationAttributes<M>[]): Promise<M[] | undefined> => super.$createMany(dto)
    findOne = (): undefined => undefined
}