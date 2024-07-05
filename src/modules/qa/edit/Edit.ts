import {hyperlink, InteractionReplyOptions, messageLink} from 'discord.js'
import {GuildEmbed} from '../../../helpers/embed.js'
import QaManager from '../managers/qa.manager.js'
import {BaseQa} from '../structures/BaseQa.js'

export class Edit extends BaseQa {
    async run(itemId: number, description: string, title?: string) {
        const item = QaManager.findOne(itemId)
        await QaManager.update(itemId, {title, description})
        const embed = await this.finalEmbed(item.messageId)
        await this.channel.messages.edit(item.messageId, {embeds: [embed]})
        const actionEmbed = GuildEmbed(this.guildId)
            .setDescription([
                this.t('qa:edited'),
                hyperlink(this.t('jump_to_message'), messageLink(this.channelId, item.messageId, this.guildId))
            ].join('\n'))
        const replyData: InteractionReplyOptions = {embeds: [actionEmbed], components: []}
        return this.reply({replyData})
    }
}