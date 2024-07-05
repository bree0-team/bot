import {Collection} from 'discord.js'
import {GuildId, MessageId, UserId} from '../../../types/base.type.js'
import SettingsXpManager from '../../settings/xp/managers/settings-xp.manager.js'
import {XpDto} from '../dto/xp.dto.js'
import {xpRange} from '../helpers/xpRange.js'
import XpManager from '../managers/xp.manager.js'
import {XpModel} from '../models/xp.model.js'

type XpDtoNoValue = Omit<XpDto, 'id' | 'value' | 'level'>

const collection = new Collection<MessageId, XpDtoNoValue>()

class _XpSendService {
    constructor(private readonly collection: Collection<string, XpDtoNoValue>) {}
    set = (
        messageId: MessageId,
        guildId: GuildId,
        userId: UserId
    ): Collection<string, XpDtoNoValue> => this.collection.set(messageId, {guildId, userId})
    async sendsAll(): Promise<XpModel[]> {
        const dto: XpDto[] = await Promise.all(this.collection
            .map(async (i, messageId) => {
            this.collection.delete(messageId)
            const {textGive} = await SettingsXpManager.getOne(i.guildId)
            const [from, to] = textGive
            const item = XpManager.findOne(i.guildId, i.userId)
            const xp = xpRange(from, to)
            return {...i, id: item?.id,  value: (item?.value || 0) + xp, level: 0}
        }))
        const dtoFiltered = dto.filter((value, index) =>
            dto.findIndex(obj => obj.guildId === value.guildId && obj.userId === value.userId) === index)
        return XpManager.createMany(dtoFiltered, ['value'])
    }
}

export const XpSendService = new _XpSendService(collection)