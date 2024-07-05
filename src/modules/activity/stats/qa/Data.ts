import {
    channelMention,
    hyperlink,
    inlineCode,
    InteractionReplyOptions,
    messageLink,
    TextChannel,
    time
} from 'discord.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {ChannelId, UserId} from '../../../../types/base.type.js'
import {PageData} from '../../../../types/data.type.js'
import {QaStatus} from '../../../qa/enums/QaStatus.enum.js'
import {DATA_AFTER, DATA_INDEX, DATA_NEXT, DATA_PREV} from './enums/CustomIds.enum.js'
import {QaStatusEmoji} from './enums/QaStatusEmoji.enum.js'
import {BaseQa} from './structures/BaseQa.js'
import {AfterQaData} from './types/data.type.js'

const limit: number = 20

const emoji: Record<QaStatus, QaStatusEmoji> = {
    [QaStatus.WRITE]: QaStatusEmoji.Write,
    [QaStatus.RESPONSE]: QaStatusEmoji.Response,
    [QaStatus.ADDITIONAL]: QaStatusEmoji.Additional,
    [QaStatus.RESOLVE]: QaStatusEmoji.Resolved
}

export class Data extends BaseQa {
    async run(
        userId: UserId,
        channelId: ChannelId,
        after: string = 'month',
        page: number = 0
    ) {
        const user = this.getClientUser(userId)
        const channel = this.getGuildChannel(channelId) as TextChannel
        const lookBack = this.getLookBack(after)
        const {
            items, totalPages, totalItems
        } = this.getQa(userId, channelId, lookBack, page, limit)
        const channels = items.map((i, index) =>
            inlineCode('#' + Number(totalItems-(page*limit+index))) + ' ' + emoji[i.status] + ' '
            + hyperlink(i.messageId, messageLink(channelId, i.messageId, this.guildId)) + ' - ' + time(i.createdAt))
            .join('\n')
        const embed = this.embed(user, after)
            .setDescription([
                channelMention(channelId),
                channels || this.t('stats:n/a')
            ].join('\n'))
        const components: InteractionReplyComponent[] = [this.dateRow(DATA_AFTER, after)]
        if (totalPages > 1) components.push(this.paginator({
            page, size: totalPages,
            prevId: DATA_PREV, indexId: DATA_INDEX, nextId: DATA_NEXT
        }))
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: AfterQaData & PageData = {userId, channelId, after, page, size: limit}
        return this.reply({replyData, data})
    }
}