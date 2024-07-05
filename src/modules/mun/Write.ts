import {ButtonBuilder, ButtonStyle, GuildMember, TextChannel} from 'discord.js'
import {GuildEmbed} from '../../helpers/embed.js'
import {ActionButtonRow, ButtonRowBuilder, InteractionReplyComponent} from '../../services/interaction.js'
import SettingsMunManager from '../settings/mun/managers/settings-mun.manager.js'
import {MUN_ACCEPT, MUN_ASSIGN, MUN_CLEAR, MUN_REJECT, MUN_WRITE} from './enums/CustomIds.enum.js'
import {MunNotInThisChannelError} from './errors/mun.error.js'
import MunManager from './managers/mun.manager.js'
import {BaseMun} from './structures/BaseMun.js'

export class Write extends BaseMun {
    buttons(): ActionButtonRow {
        const buttons = [
            new ButtonBuilder({
                customId: MUN_ACCEPT,
                style: ButtonStyle.Success,
                label: this.t('mun:buttons:accept')
            }),
            new ButtonBuilder({
                customId: MUN_REJECT,
                style: ButtonStyle.Danger,
                label: this.t('mun:buttons:reject')
            }),
            new ButtonBuilder({
                customId: MUN_CLEAR,
                style: ButtonStyle.Secondary,
                label: this.t('mun:buttons:clear')
            }),
            new ButtonBuilder({
                customId: MUN_ASSIGN,
                style: ButtonStyle.Primary,
                label: this.t('mun:buttons:assign')
            })
        ]
        return ButtonRowBuilder(...buttons)
    }
    button(): ActionButtonRow {
        const button = new ButtonBuilder({
            customId: MUN_WRITE,
            style: ButtonStyle.Primary,
            label: this.t('write')
        })
        return ButtonRowBuilder(button)
    }
    async deleteMessages(channel: TextChannel) {
        try {
            if (!MunManager.findOne(channel.lastMessageId)) await channel.messages.delete(channel.lastMessageId)
            const messages = channel.messages.cache.map(i => i).slice(-10)
                .filter(i => !MunManager.findOne(i.id))
            for (let i of messages) await channel.messages.delete(i.id)
        } catch (e) {}
    }
    async run(value: string) {
        const {channelId, title, description} = await SettingsMunManager.getOne(this.guildId)
        if (channelId !== this.channelId) throw new MunNotInThisChannelError(this.i)
        const channel = this.getGuildChannel(channelId) as TextChannel
        await this.deleteMessages(channel)
        const member = this.i.member as GuildMember
        const embed = this.embed(member, member.displayName, value)
        const components: InteractionReplyComponent[] = [this.buttons()]
        const message = await channel.send({embeds: [embed], components})
        MunManager.create(this.guildId, channelId, message.id, {
            userId: this.userId, oldValue: member.displayName, newValue: value
        })
        return this.send(channel, title, description)
    }
    send(channel: TextChannel, title: string, description: string) {
        const embed = GuildEmbed(this.guildId)
        if (title) embed.setTitle(title)
        if (description) embed.setDescription(description)
        if (!embed.length) embed.setDescription('empty')
        const components: InteractionReplyComponent[] = [this.button()]
        return channel.send({embeds: [embed], components})
    }
}