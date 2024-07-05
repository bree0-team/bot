import {hyperlink, InteractionReplyOptions, messageLink} from 'discord.js'
import {EmbedColors} from '../../../enums/EmbedColors.enum.js'
import {GuildEmbed} from '../../../helpers/embed.js'
import {MessageId} from '../../../types/base.type.js'
import {QaStatus} from '../enums/QaStatus.enum.js'
import {BaseQa} from '../structures/BaseQa.js'

export class Resolve extends BaseQa {
    async run(messageId: MessageId) {
        const embed = (await this.finalEmbed(messageId))
            .setColor(EmbedColors.SUCCESS)
            .setFooter({text: this.t('qa:resolved_at') + ':'})
            .setTimestamp(this.i.createdAt)
        await this.channel.messages.edit(messageId, {embeds: [embed], components: []})
        this.insertData(messageId, QaStatus.RESOLVE)
        const actionEmbed = GuildEmbed(this.guildId)
            .setDescription([
                this.t('qa:resolved'),
                hyperlink(this.t('jump_to_message'), messageLink(this.channelId, messageId, this.guildId))
            ].join('\n'))
        const replyData: InteractionReplyOptions = {embeds: [actionEmbed], components: []}
        return this.reply({replyData})
    }
}