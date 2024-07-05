import {channelMention, inlineCode, InteractionReplyOptions} from 'discord.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {UserId} from '../../../../types/base.type.js'
import {PageData} from '../../../../types/data.type.js'
import {AfterData} from '../../types/data.type.js'
import {MESSAGES, RANK, VOICES, VOICES_AFTER, VOICES_INDEX, VOICES_NEXT, VOICES_PREV} from './enums/CustomIds.enum.js'
import {BaseUser} from './structures/BaseUser.js'

const limit: number = 10

export class Voices extends BaseUser {
    async run(userId: UserId, after: string = 'month', page: number = 0) {
        const user = this.getClientUser(userId)
        const lookBack = this.getLookBack(after)
        const {items, pages} = this.getVoices(user.id, lookBack, page, limit)
        const channels = items.map((i, index) =>
            inlineCode('#' + Number(page*limit+index+1)) + ' ' + channelMention(i.channelId) + ' '
            + this.duration(i.count)).join('\n\n')
        const embed = this.embed(user, after)
            .setDescription(channels || this.t('stats:n/a'))
        const components: InteractionReplyComponent[] = [
            this.dateRow(VOICES_AFTER, after),
            this.buttons(VOICES, [{id: RANK, emoji: '🏆'}, {id: MESSAGES, emoji: '🗨️'}])
        ]
        if (pages > 1) components.push(this.paginator({
            page, size: pages,
            prevId: VOICES_PREV, indexId: VOICES_INDEX, nextId: VOICES_NEXT
        }))
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: AfterData & PageData = {itemId: userId, after, page, size: pages}
        return this.reply({replyData, data})
    }
}