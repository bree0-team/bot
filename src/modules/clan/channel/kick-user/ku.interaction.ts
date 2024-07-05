import {
    ButtonInteraction,
    GuildMember,
    InteractionReplyOptions,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import {DiscordEmoji} from '../../../../enums/DiscordEmoji.enum.js'
import {UnknownVoiceError} from '../../../../errors/notfound.js'
import {ButtonHandlerOptions, PublicHandler} from '../../../../handlers/interaction.js'
import {ActionStringSelectRow, StringSelectRowBuilder} from '../../../../services/interaction.js'
import {clanTitleEmbed} from '../../helpers/embed.js'
import {ClanChannelButtonCustomIds} from '../enums/CustomIds.enum.js'
import {ClanChannelVoiceError, ClanChannelVoiceMembersError} from '../errors/clan-channel.error.js'
import {allCheck} from '../helpers/allCheck.js'
import ClanChannelManager from '../managers/clan-channel.manager.js'
import {CLAN_CHANNEL_KU_SELECT} from './enums/CustomIds.enum.js'

class KickUserInteraction extends PublicHandler {
    private userRow(interaction: ButtonInteraction, members: GuildMember[]): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: CLAN_CHANNEL_KU_SELECT,
            placeholder: interaction.t('select:users'),
            maxValues: members.length
        }).setOptions(members.map(i => new StringSelectMenuOptionBuilder({
            emoji: DiscordEmoji.Mention,
            label: i.displayName,
            value: i.id
        })))
        return StringSelectRowBuilder(select)
    }
    protected async run({interaction}: ButtonHandlerOptions) {
        const {clan} = await allCheck(interaction)
        const iMember = interaction.member as GuildMember
        const voiceChannel = iMember.voice.channel
        if (!voiceChannel) throw new UnknownVoiceError(interaction)
        const clanChannel = ClanChannelManager.findAll()
            .find(i => i.clanId === clan.id && i.channelId === voiceChannel.id)
        if (!clanChannel) throw new ClanChannelVoiceError(interaction)
        const members = voiceChannel.members.map(i => i)
            .filter(i => i.id !== interaction.user.id)
        if (!members.length) throw new ClanChannelVoiceMembersError(interaction)
        const embed = (await clanTitleEmbed(clan, interaction.t('clan:clan')))
            .setDescription(interaction.t('clan:channel:kick_user:description'))
        const replyData: InteractionReplyOptions = {
            embeds: [embed],
            components: [this.userRow(interaction, members)],
            ephemeral: true
        }
        return interaction.followUp(replyData)
    }
}

export default new KickUserInteraction(ClanChannelButtonCustomIds.KickUser)