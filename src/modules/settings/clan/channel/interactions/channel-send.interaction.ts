import {ButtonBuilder, ButtonStyle, ChannelType, TextChannel} from 'discord.js'
import {InteractionEmoji} from '../../../../../enums/InteractionEmoji.enum.js'
import {ButtonHandlerOptions, PrivateHandler} from '../../../../../handlers/interaction.js'
import {GuildEmbed} from '../../../../../helpers/embed.js'
import {ActionButtonRow, ButtonRowBuilder, ConfirmButton} from '../../../../../services/interaction.js'
import {InteractionUtils} from '../../../../../utils/interaction.js'
import {ClanChannelButtonCustomIds} from '../../../../clan/channel/enums/CustomIds.enum.js'
import {ChannelRankAccessData} from '../../types/data.type.js'
import {Channel} from '../Channel.js'
import {ClanChannelEmoji} from '../enums/ClanChannelEmoji.enum.js'
import {
    CHANNEL_CREATE_CATEGORY_CANCEL,
    CHANNEL_CREATE_CATEGORY_CONFIRM,
    CHANNEL_SEND_CONFIRM
} from '../enums/CustomIds.enum.js'
import {interfaceChannelOverwrite} from '../helpers/overwrite.js'
import SettingsClanChannelManager from '../managers/settings-clan-channel.manager.js'

class ChannelSendInteraction extends PrivateHandler {
    private buttons(): ActionButtonRow[] {
        const buttons1row = [
            new ButtonBuilder({
                customId: ClanChannelButtonCustomIds.VoiceChannel,
                style: ButtonStyle.Secondary,
                emoji: ClanChannelEmoji.VoiceChannel,
            }),
            new ButtonBuilder({
                customId: ClanChannelButtonCustomIds.TextChannel,
                style: ButtonStyle.Secondary,
                emoji: ClanChannelEmoji.TextChannel,
            }),
            new ButtonBuilder({
                customId: ClanChannelButtonCustomIds.UserRights,
                style: ButtonStyle.Secondary,
                emoji: ClanChannelEmoji.UserRights,
            }),
            new ButtonBuilder({
                customId: ClanChannelButtonCustomIds.Name,
                style: ButtonStyle.Secondary,
                emoji: ClanChannelEmoji.Name,
            }),
            new ButtonBuilder({
                customId: ClanChannelButtonCustomIds.Delete,
                style: ButtonStyle.Secondary,
                emoji: ClanChannelEmoji.Delete,
            }),
        ]
        const buttons2row = [
            new ButtonBuilder({
                customId: ClanChannelButtonCustomIds.Skip1,
                style: ButtonStyle.Secondary,
                emoji: InteractionEmoji.EMPTY,
            }),
            new ButtonBuilder({
                customId: ClanChannelButtonCustomIds.LimitMembers,
                style: ButtonStyle.Secondary,
                emoji: ClanChannelEmoji.LimitMembers,
            }),
            new ButtonBuilder({
                customId: ClanChannelButtonCustomIds.Rights,
                style: ButtonStyle.Secondary,
                emoji: ClanChannelEmoji.Rights,
            }),
            new ButtonBuilder({
                customId: ClanChannelButtonCustomIds.KickUser,
                style: ButtonStyle.Secondary,
                emoji: ClanChannelEmoji.KickUser,
            }),
            new ButtonBuilder({
                customId: ClanChannelButtonCustomIds.Skip2,
                style: ButtonStyle.Secondary,
                emoji: InteractionEmoji.EMPTY,
            }),
        ]
        return [ButtonRowBuilder(...buttons1row), ButtonRowBuilder(...buttons2row)]
    }
    protected async run({interaction, data}: ButtonHandlerOptions<ChannelRankAccessData>) {
        const channelManager = await SettingsClanChannelManager.getOne(interaction.guildId)
        const categoryChannel = channelManager.channelId &&
            interaction.guild.channels.resolve(channelManager.channelId)

        if (!categoryChannel) {
            const embed = GuildEmbed(interaction.guildId)
                .setDescription(interaction.t('settings:clan:channel:category:not_set'))
            return ConfirmButton({
                interaction, embed,
                confirmId: CHANNEL_CREATE_CATEGORY_CONFIRM,
                cancelId: CHANNEL_CREATE_CATEGORY_CANCEL
            })
        }

        let textChannel = (channelManager.channelId &&
            interaction.guild.channels.resolve(channelManager.channelId)) as TextChannel

        if (!textChannel) {
            textChannel = await InteractionUtils.createChannel(interaction, {
                type: ChannelType.GuildText,
                parent: categoryChannel.id,
                name: interaction.t('settings:clan:channel:interface'),
                permissionOverwrites: interfaceChannelOverwrite(interaction.client.user, interaction.guildId)
            })
            await SettingsClanChannelManager.createOrUpdate(interaction.guildId, {channelId: textChannel.id})
        }

        const embed = GuildEmbed(interaction.guildId)
            .setDescription([
                ClanChannelEmoji.VoiceChannel + ' ' + interaction.t('settings:clan:channel:options:voiceChannel'),
                ClanChannelEmoji.TextChannel + ' ' + interaction.t('settings:clan:channel:options:textChannel'),
                ClanChannelEmoji.UserRights + ' ' + interaction.t('settings:clan:channel:options:userRights'),
                ClanChannelEmoji.Name + ' ' + interaction.t('settings:clan:channel:options:name'),
                ClanChannelEmoji.Delete + ' ' + interaction.t('settings:clan:channel:options:delete'),
                '',
                ClanChannelEmoji.LimitMembers + ' ' + interaction.t('settings:clan:channel:options:limitMembers'),
                ClanChannelEmoji.Rights + ' ' + interaction.t('settings:clan:channel:options:rights'),
                ClanChannelEmoji.KickUser + ' ' + interaction.t('settings:clan:channel:options:kickUser'),
            ].join('\n'))
        const message = await textChannel.send({embeds: [embed], components: this.buttons()})
        await SettingsClanChannelManager.createOrUpdate(interaction.guildId, {messageId: message.id})
        const {rank, rights} = data
        return new Channel(interaction).run(rank, rights)
    }
}

export default new ChannelSendInteraction(CHANNEL_SEND_CONFIRM)