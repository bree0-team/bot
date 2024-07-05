import {channelMention, inlineCode, InteractionReplyOptions, time} from 'discord.js'
import {days} from '../../../../helpers/counts.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {UserId} from '../../../../types/base.type.js'
import MessageManager from '../../managers/message.manager.js'
import VoiceManager from '../../managers/voice.manager.js'
import {AfterData} from '../../types/data.type.js'
import {MESSAGES, RANK, RANK_AFTER, VOICES} from './enums/CustomIds.enum.js'
import {BaseUser} from './structures/BaseUser.js'

interface UserRank {
    userId: UserId
    index: number
}

export class Rank extends BaseUser {
    getRank(text: boolean, userId: UserId, after: Date): number | null {
        const {items} = (text ? MessageManager : VoiceManager).findUsers(this.guildId, after)
        const user = items
            .map(({userId}, index): UserRank => ({userId, index}))
            .find(i => i.userId === userId)
        return user ? user.index + 1 : null
    }
    getCounts(text: boolean, userId: UserId, after: Date): number {
        const {items} = (text ? this.getTexts : this.getVoices)(userId, after)
        return items.reduce((acc, {count}) => acc + count, 0)
    }
    getEntries = (text: boolean, userId: UserId): [string, number][] => Object
        .entries({1: this.date.day(), 7: this.date.week(), 30: this.date.month()})
        .map(([_days, data]) => [_days, this.getCounts(text, userId, data)])
    async run(userId: UserId, after: string = 'month') {
        const user = this.getClientUser(userId)
        const member = this.getGuildMember(userId)
        const lookBack = this.getLookBack(after)
        const embed = this.embed(user, after)
            .setFields(
                EmbedField(this.t('stats:server_rank'), [true, false].map(i => {
                    const rank = this.getRank(i, userId, lookBack)
                    return inlineCode(this.t('stats:' + (i ? 'message' : 'rank_voice'))) + ' '
                        + (rank ? ('#' + rank) : this.t('no'))
                }).join('\n'), true),
                EmbedField(this.t('created_at'), time(user.createdAt, 'f'), true),
                ...[true, false].map(i => EmbedField(this.t('stats:' + (i ? 'message': 'voice')),
                    this.getEntries(i, userId).map(([_days, data]) => {
                        const dur = data ? (i ? this.messages : this.duration)(data) : this.t('stats:n/a')
                        return inlineCode(days(this.i, Number(_days))) + ' ' + dur
                    }).join('\n'))),
                EmbedField(this.t('stats:top:channels'), [true, false].map(text =>
                    (text ? this.getTexts : this.getVoices)(userId, lookBack, 0, 1).items
                        .map(i => channelMention(i.channelId) + ' '
                            + (text ? this.messages : this.duration)(i.count))
                        .join('\n') || this.t('stats:n/a')).join('\n'))
            )
        if (member) embed.spliceFields(2, 0,
                EmbedField(this.t('joined_at'), time(member.joinedAt, 'f'), true))
        const components: InteractionReplyComponent[] = [
            this.dateRow(RANK_AFTER, after),
            this.buttons(RANK, [{id: MESSAGES, emoji: '🗨️'}, {id: VOICES, emoji: '🗣️'}])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: AfterData = {itemId: userId, after}
        return this.reply({replyData, data})
    }
}