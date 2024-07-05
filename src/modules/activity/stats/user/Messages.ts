import {channelMention, inlineCode, InteractionReplyOptions} from 'discord.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {UserId} from '../../../../types/base.type.js'
import {PageData} from '../../../../types/data.type.js'
import {AfterData} from '../../types/data.type.js'
import {
    MESSAGES,
    MESSAGES_AFTER,
    MESSAGES_INDEX,
    MESSAGES_NEXT,
    MESSAGES_PREV,
    RANK,
    VOICES
} from './enums/CustomIds.enum.js'
import {BaseUser} from './structures/BaseUser.js'

const limit: number = 10

export class Messages extends BaseUser {
    async run(userId: UserId, after: string = 'month', page: number = 0) {
        const user = this.getClientUser(userId)
        const lookBack = this.getLookBack(after)
        const {items, pages} = this.getTexts(user.id, lookBack, page, limit)
        const channels = items.map((i, index) =>
            inlineCode('#' + Number(page*limit+index+1)) + ' ' + channelMention(i.channelId) + ' '
            + this.messages(i.count)).join('\n\n')
        const embed = this.embed(user, after)
            .setDescription(channels || this.t('stats:n/a'))
        const components: InteractionReplyComponent[] = [
            this.dateRow(MESSAGES_AFTER, after),
            this.buttons(MESSAGES, [{id: RANK, emoji: '🏆'}, {id: VOICES, emoji: '🗣️'}])
        ]
        if (pages > 1) components.push(this.paginator({
            page, size: pages,
            prevId: MESSAGES_PREV, indexId: MESSAGES_INDEX, nextId: MESSAGES_NEXT
        }))
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: AfterData & PageData = {itemId: userId, after, page, size: pages}
        return this.reply({replyData, data})
    }
}