import {hyperlink, InteractionReplyOptions, messageLink} from 'discord.js'
import {EmbedField, GuildEmbed} from '../../../helpers/embed.js'
import {MessageId} from '../../../types/base.type.js'
import SettingsQaManager from '../../settings/qa/managers/settings-qa.manager.js'
import {QaStatus} from '../enums/QaStatus.enum.js'
import QaManager from '../managers/qa.manager.js'
import {BaseQa} from '../structures/BaseQa.js'

export class Reply extends BaseQa {
    async run(messageId: MessageId, value: string) {
        const qaSettingsManager = SettingsQaManager.findOne(this.guildId, this.channelId)
        const qaManager = QaManager.findAllByMessageId(messageId)
            .find(i => i.status === QaStatus.RESPONSE)
        const embed = (await this.finalEmbed(messageId))
            .addFields(EmbedField(
                qaSettingsManager[qaManager ? 'addsResp' : 'resp'],
                this.respContent(
                    qaSettingsManager[qaManager ? 'addsRespContent' : 'respContent'], this.user, value
                )
            ))
            .setFooter({text: this.t('qa:replied_at') + ':'})
            .setTimestamp(this.i.createdAt)
        await this.channel.messages.edit(messageId, {embeds: [embed]})
        this.insertData(messageId, QaStatus[qaManager ? 'ADDITIONAL' : 'RESPONSE'], value)
        const actionEmbed = GuildEmbed(this.guildId)
            .setDescription([
                this.t('qa:replied'),
                hyperlink(this.t('jump_to_message'), messageLink(this.channelId, messageId, this.guildId))
            ].join('\n'))
        const replyData: InteractionReplyOptions = {embeds: [actionEmbed], components: []}
        return this.reply({replyData})
    }
}