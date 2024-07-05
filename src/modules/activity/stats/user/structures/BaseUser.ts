import {EmbedBuilder, User as DUser} from 'discord.js'
import {UserId} from '../../../../../types/base.type.js'
import MessageManager from '../../../managers/message.manager.js'
import VoiceManager from '../../../managers/voice.manager.js'
import {ChannelItems} from '../../../types/items.type.js'
import {BaseStats} from '../../structures/BaseStats.js'

export abstract class BaseUser extends BaseStats {
    embed = (user: DUser, after: string): EmbedBuilder => super.embed(user, after)
        .setAuthor({name: user.displayName, iconURL: user.avatarURL()})
    getVoices = (userId: UserId, after: Date, page?: number, limit?: number): ChannelItems =>
        VoiceManager.findUser(this.guildId, userId, after, page, limit)
    getTexts = (userId: UserId, after: Date, page?: number, limit?: number): ChannelItems =>
        MessageManager.findUser(this.guildId, userId, after, page, limit)
}