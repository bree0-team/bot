import {EmbedBuilder, GuildMember, InteractionReplyOptions} from 'discord.js'
import {EmbedColors} from '../../enums/EmbedColors.enum.js'
import {UnknownVoiceError} from '../../errors/notfound.js'
import {BaseStructure} from '../../structures/base.js'

export class Lock extends BaseStructure {
    async run() {
        const member = this.i.member as GuildMember
        const voice = member.voice.channel
        let userLimit = 1
        let color = EmbedColors.DENIED

        if (!voice) throw new UnknownVoiceError(this.i)
        if (voice.userLimit >= 1) {
            userLimit = 0
            color = EmbedColors.SUCCESS
        }

        await voice.edit({
            userLimit,
            reason: this.t('lock:reason:' + (userLimit === 0 ? 'open' : 'close'), {
                user: this.user.displayName
            })
        })
        const embed = new EmbedBuilder({
            color, author: {name: this.user.displayName, iconURL: this.user.avatarURL()},
            description: this.t('lock:' + (userLimit === 0 ? 'open' : 'close'), {
                user: this.user, channel: voice
            })
        })
        const replyData: InteractionReplyOptions = {embeds: [embed]}
        return this.reply({replyData});
    }
}