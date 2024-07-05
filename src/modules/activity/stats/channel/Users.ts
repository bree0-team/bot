import {inlineCode, InteractionReplyOptions, TextChannel, userMention, VoiceChannel} from 'discord.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {PageData} from '../../../../types/data.type.js'
import {AfterData} from '../../types/data.type.js'
import {RANK, USERS, USERS_AFTER, USERS_INDEX, USERS_NEXT, USERS_PREV} from './enums/CustomIds.enum.js'
import {BaseChannel} from './structures/BaseChannel.js'

const limit: number = 10

export class Users extends BaseChannel {
    async run(channelId: ChannelId, after: string = 'month', page: number = 0) {
        const channel = this.getGuildChannel(channelId)
        const lookBack = this.getLookBack(after)
        const text = !channel.isVoiceBased()
        const {items, pages} = (text
            ? this.getTexts : this.getVoices)(channelId, lookBack, page, limit)
        const channels = items.map((i, index) =>
            inlineCode('#' + Number(page*limit+index+1)) + ' ' + userMention(i.userId) + ' '
            + (text ? this.messages : this.duration)(i.count)).join('\n\n')
        const embed = this.embed(channel as (TextChannel | VoiceChannel), after)
            .setDescription(channels || this.t('stats:n/a'))
        const components: InteractionReplyComponent[] = [
            this.dateRow(USERS_AFTER, after),
            this.buttons(USERS, [{id: RANK, emoji: '🏆'}])
        ]
        if (pages > 1) components.push(this.paginator({
            page, size: pages,
            prevId: USERS_PREV, indexId: USERS_INDEX, nextId: USERS_NEXT
        }))
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: AfterData & PageData = {itemId: channelId, after, page, size: pages}
        return this.reply({replyData, data})
    }
}