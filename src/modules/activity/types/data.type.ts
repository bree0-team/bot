import {ChannelId, UserId} from '../../../types/base.type.js'
import {AfterQaData} from '../stats/qa/types/data.type.js'

export interface AfterData {
    itemId: UserId | ChannelId
    after: string
}

export type ActivityData = AfterData | AfterQaData