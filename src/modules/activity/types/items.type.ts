import {ChannelId, UserId} from '../../../types/base.type.js'

export interface UserCounts {
    userId: UserId
    count: number
}
export interface ChannelCounts {
    channelId: ChannelId
    count: number
}
export type AnyCounts = UserCounts | ChannelCounts

export interface UserItems {
    items: UserCounts[]
    pages: number
}
export interface ChannelItems {
    items: ChannelCounts[]
    pages: number
}
export type AnyItems = UserCounts | ChannelItems