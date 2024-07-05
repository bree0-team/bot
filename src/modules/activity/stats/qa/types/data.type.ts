import {ChannelId, UserId} from '../../../../../types/base.type.js'

export interface AfterQaData {
    userId: UserId
    channelId: ChannelId
    after: string
}