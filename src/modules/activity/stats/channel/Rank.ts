import {bold, inlineCode, InteractionReplyOptions, TextChannel, time, userMention, VoiceChannel} from 'discord.js'
import {days, users} from '../../../../helpers/counts.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {AfterData} from '../../types/data.type.js'
import {RANK, RANK_AFTER, USERS} from './enums/CustomIds.enum.js'
import {BaseChannel} from './structures/BaseChannel.js'

export class Rank extends BaseChannel {
    getCounts(text: boolean, channelId: ChannelId, after: Date): number {
        const {items} = (text ? this.getTexts : this.getVoices)(channelId, after)
        return items.reduce((acc, {count}) => acc + count, 0)
    }
    getEntries = (text: boolean, channelId: ChannelId): [string, number][] => Object
        .entries({1: this.date.day(), 7: this.date.week(), 30: this.date.month()})
        .map(([_days, data]) => [_days, this.getCounts(text, channelId, data)])
    contributorsEntries = (text: boolean, channelId: ChannelId): [string, number][] => Object
        .entries({1: this.date.day(), 7: this.date.week(), 30: this.date.month()})
        .map(([_days, data]) =>
            [_days, (text ? this.getTexts : this.getVoices)(channelId, data).items.length])
    async run(channelId: ChannelId, after: string = 'month') {
        const channel = this.getGuildChannel(channelId)
        const lookBack = this.getLookBack(after)
        const text = !channel.isVoiceBased()
        const serverLookBack = (text ? this.messages : this.duration)(this.getCounts(text, channelId, lookBack))
        const embed = this.embed(channel as (TextChannel | VoiceChannel), after)
            .setDescription(bold(this.t('stats:data_after') + ': ') + (serverLookBack || this.t('no')))
            .setFields(
                EmbedField(this.t('stats:'  + (text ? 'message' : 'voice')), this.getEntries(text, channelId)
                    .map(([_days, data]) => {
                        const dur = data ? (text ? this.messages : this.duration)(data) : this.t('stats:n/a')
                        return inlineCode(days(this.i, Number(_days))) + ' ' + dur
                    }).join('\n'), true),
                EmbedField(this.t('created_at'), time(channel.createdAt, 'f'), true),
                EmbedField(this.t('stats:contributors'), this.contributorsEntries(text, channelId)
                    .map(([_days, data]) => {
                        const dur = data ? users(this.i, data) : this.t('stats:n/a')
                        return inlineCode(days(this.i, Number(_days))) + ' ' + dur
                    }).join('\n')),
                EmbedField(this.t('stats:top:users'), (text
                    ? this.getTexts : this.getVoices)(channelId, lookBack, 0, 3).items.map(i =>
                    userMention(i.userId) + ' ' + (text ? this.messages : this.duration)(i.count))
                    .join('\n')  || this.t('stats:n/a'))
            )
        const components: InteractionReplyComponent[] = [
            this.dateRow(RANK_AFTER, after),
            this.buttons(RANK, [{id: USERS, emoji: '🗣️'}])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: AfterData = {itemId: channelId, after}
        return this.reply({replyData, data})
    }
}