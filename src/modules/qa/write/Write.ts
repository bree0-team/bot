import {ButtonBuilder, ButtonStyle, TextChannel} from 'discord.js'
import {GuildEmbed} from '../../../helpers/embed.js'
import {ActionButtonRow, ButtonRowBuilder, InteractionReplyComponent} from '../../../services/interaction.js'
import SettingsQaManager from '../../settings/qa/managers/settings-qa.manager.js'
import {QA_ACTION} from '../enums/CustomIds.enum.js'
import {QaEmoji} from '../enums/QaEmoji.enum.js'
import {QaStatus} from '../enums/QaStatus.enum.js'
import {QaNotInThisChannelError} from '../errors/qa.error.js'
import QaManager from '../managers/qa.manager.js'
import {BaseQa} from '../structures/BaseQa.js'
import {QA_WRITE} from './enums/CustomIds.enum.js'

export class Write extends BaseQa {
    get actionButton(): ActionButtonRow {
        const button = new ButtonBuilder({
            customId: QA_ACTION,
            style: ButtonStyle.Primary,
            emoji: QaEmoji.action
        })
        return ButtonRowBuilder(button)
    }
    get writeButton(): ActionButtonRow {
        const button = new ButtonBuilder({
            customId: QA_WRITE,
            style: ButtonStyle.Primary,
            label: this.t('write')
        })
        return ButtonRowBuilder(button)
    }
    async deleteMessages(channel: TextChannel) {
        try {
            if (!QaManager.findAllByMessageId(channel.lastMessageId).size)
                await channel.messages.delete(channel.lastMessageId)
            const messages = channel.messages.cache.map(i => i).slice(-10)
                .filter(i => !QaManager.findAllByMessageId(i.id).size)
            for (let i of messages) await channel.messages.delete(i.id)
        } catch (e) {}
    }
    async run(valueTitle: string | undefined, valueDescription: string) {
        const qaManager = SettingsQaManager.findOne(this.guildId, this.channelId)
        if (!qaManager) throw new QaNotInThisChannelError(this.i)
        const {channelId, title, description, text} = qaManager
        const channel = this.getGuildChannel(channelId) as TextChannel
        if (!channel) return;
        await this.deleteMessages(channel)
        const embed = this.embed(this.text(text, this.user), valueDescription)
        if (valueTitle) embed.setTitle(valueTitle)
        const components: InteractionReplyComponent[] = [this.actionButton]
        const message = await channel.send({embeds: [embed], components})
        this.insertData(message.id, QaStatus.WRITE, valueDescription, valueTitle || undefined)
        return this.send(channel, title, description)
    }
    send(channel: TextChannel, title: string, description: string) {
        const embed = GuildEmbed(this.guildId)
        if (title) embed.setTitle(title)
        if (description) embed.setDescription(description)
        if (!embed.length) embed.setDescription('empty')
        const components: InteractionReplyComponent[] = [this.writeButton]
        return channel.send({embeds: [embed], components})
    }
}