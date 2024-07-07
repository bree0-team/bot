import {EmbedBuilder, GuildMember, InteractionReplyOptions} from 'discord.js'
import {EmbedColors} from '../../enums/EmbedColors.enum.js'
import {UnknownMemberError} from '../../errors/notfound.js'
import {BaseStructure} from '../../structures/base.js'
import {InteractionUtils} from '../../utils/interaction.js'

export class Nickname extends BaseStructure {
    async run() {
        const user = this.getMember('user')
        const nick = this.getString('nick', false)
        if (!(user instanceof GuildMember)) throw new UnknownMemberError(this.i)
        await InteractionUtils.editMember(this.i, user,{
            nick, reason: this.t('nickname:reason', {user: user.displayName})
        })
        const embed = new EmbedBuilder({
            color: EmbedColors[nick ? 'SUCCESS' : 'WARNING'],
            author: {name: this.user.displayName, iconURL: this.user.avatarURL()},
            description: this.t('nickname:' + (nick ? 'set' : 'reset'), {user, nick})
        })
        const replyData: InteractionReplyOptions = {embeds: [embed]}
        return this.reply({replyData});
    }
}