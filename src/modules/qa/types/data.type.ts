import {MessageId} from '../../../types/base.type.js'
import {QaItemData} from '../edit/types/data.type.js'

export interface QaData {
    messageId: MessageId
}

export type QaGlobalData = QaData | QaItemData