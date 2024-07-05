import {hyperlink, InteractionReplyOptions, messageLink, userMention} from 'discord.js'
import {GuildEmbed} from '../../../helpers/embed.js'
import {MessageId} from '../../../types/base.type.js'
import {QaStatus} from '../enums/QaStatus.enum.js'
import {QaUserDontHaveRightsToModifyError} from '../errors/qa.error.js'
import QaManager from '../managers/qa.manager.js'
import {BaseQa} from '../structures/BaseQa.js'

export class Delete extends BaseQa {
    async run(messageId: MessageId) {
        const staff = this.staffAccess(false)
        const qaManager = QaManager.findAllByMessageId(messageId)
        const writerOrReplier = qaManager.filter(i => i.userId === this.userId)
        if (!staff && !writerOrReplier.size) throw new QaUserDontHaveRightsToModifyError(this.i)
        await this.channel.messages.delete(messageId)
        QaManager.removeAll(messageId)
        const writer = qaManager.find(i => i.status === QaStatus.WRITE)
        const actionEmbed = GuildEmbed(this.guildId)
            .setDescription([
                this.t('qa:deleted', {user: userMention(writer.userId)}),
                hyperlink(this.t('jump_to_message'), messageLink(this.channelId, messageId, this.guildId))
            ].join('\n'))
        const replyData: InteractionReplyOptions = {embeds: [actionEmbed], components: []}
        return this.reply({replyData})
    }
}