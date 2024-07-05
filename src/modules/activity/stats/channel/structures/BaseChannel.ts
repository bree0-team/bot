import {EmbedBuilder, TextChannel, VoiceChannel} from 'discord.js'
import {ChannelId} from '../../../../../types/base.type.js'
import MessageManager from '../../../managers/message.manager.js'
import VoiceManager from '../../../managers/voice.manager.js'
import {UserItems} from '../../../types/items.type.js'
import {BaseStats} from '../../structures/BaseStats.js'

export abstract class BaseChannel extends BaseStats {
    embed = (channel: TextChannel | VoiceChannel, after: string): EmbedBuilder => super.embed(channel, after)
        .setAuthor({name: channel.name})
    getVoices = (channelId: ChannelId, after: Date, page?: number, limit?: number): UserItems =>
        VoiceManager.findChannel(this.guildId, channelId, after, page, limit)
    getTexts = (channelId: ChannelId, after: Date, page?: number, limit?: number): UserItems =>
        MessageManager.findChannel(this.guildId, channelId, after, page, limit)
}