import {hyperlink, inlineCode, InteractionReplyOptions, messageLink, time} from 'discord.js'
import {TickEmoji} from '../../../../enums/TickEmoji.enum.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {UserId} from '../../../../types/base.type.js'
import {PageData} from '../../../../types/data.type.js'
import {MunStatus} from '../../../mun/enums/MunStatus.enum.js'
import {AfterData} from '../../types/data.type.js'
import {MUN_AFTER, MUN_INDEX, MUN_NEXT, MUN_PREV} from './enums/CustomIds.enum.js'
import {BaseMun} from './structures/BaseMun.js'

const limit: number = 20

const emoji: Record<MunStatus, TickEmoji> = {
    [MunStatus.ACCEPT]: TickEmoji.CHECK,
    [MunStatus.REJECT]: TickEmoji.CROSS,
    [MunStatus.CLEAR]: TickEmoji.BRUSH,
    [MunStatus.ASSIGN]: TickEmoji.WRITE
}

export class Data extends BaseMun {
    async run(userId: UserId, after: string = 'month', page: number = 0) {
        const user = this.getClientUser(userId)
        const lookBack = this.getLookBack(after)
        const {
            items, totalPages, totalItems
        } = this.getMun(userId, lookBack, page, limit)
        const channels = items.map((i, index) =>
            inlineCode('#' + Number(totalItems-(page*limit+index))) + ' ' + emoji[i.status] + ' '
            + hyperlink(i.newValue, messageLink(i.channelId, i.messageId, this.guildId)) + ' - ' + time(i.createdAt))
            .join('\n')
        const embed = this.embed(user, after)
            .setDescription(channels || this.t('stats:n/a'))
        const components: InteractionReplyComponent[] = [this.dateRow(MUN_AFTER, after)]
        if (totalPages > 1) components.push(this.paginator({
            page, size: totalPages,
            prevId: MUN_PREV, indexId: MUN_INDEX, nextId: MUN_NEXT
        }))
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: AfterData & PageData = {itemId: userId, after, page, size: limit}
        return this.reply({replyData, data})
    }
}