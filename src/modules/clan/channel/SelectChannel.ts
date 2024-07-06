import {ChannelType, InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import {DiscordEmoji} from '../../../enums/DiscordEmoji.enum.js'
import {ActionStringSelectRow, StringSelectRowBuilder} from '../../../services/interaction.js'
import {CustomId} from '../../../types/base.type.js'
import {BaseClan} from '../structures/BaseClan.js'
import {ClanId} from '../types/clan.type.js'
import {ClanChannelDontHaveError} from './errors/clan-channel.error.js'
import {allCheck} from './helpers/allCheck.js'
import ClanChannelManager from './managers/clan-channel.manager.js'
import {ChannelData} from './types/data.type.js'

const emoji = {
    0: DiscordEmoji.TextChannel,
    2: DiscordEmoji.VoiceChannel,
}

export class SelectChannel extends BaseClan {
    async selectRow(clanId: ClanId, customId: CustomId, filterType?: ChannelType): Promise<ActionStringSelectRow> {
        const channelManager = ClanChannelManager.findAllByClanId(clanId)
        let channels = channelManager
            .map(i => {
                const channel = this.guild.channels.resolve(i.channelId)
                if (!channel) ClanChannelManager.remove(i.channelId)
                return channel
            })
            .filter(i => i)
            .sort((a, b) => a.type - b.type)
        if (filterType) channels = channels.filter(i => i.type === filterType)
        if (!channels.length) throw new ClanChannelDontHaveError(this.i)
        const select = new StringSelectMenuBuilder({
            customId, placeholder: this.t('select:channel'),
            maxValues: channels.length
        }).setOptions(channels.map(i => new StringSelectMenuOptionBuilder({
            emoji: emoji[i.type],
            label: i.name,
            value: i.id
        })))
        return StringSelectRowBuilder(select)
    }
    async run(customId: CustomId, filterType?: ChannelType, data?: ChannelData) {
        const {clan} = await allCheck(this.i)
        const embed = (await this.clanTitleEmbed(clan))
            .setDescription(this.t('clan:channel:select_channels_description'))
        const replyData: InteractionReplyOptions = {
            embeds: [embed],
            components: [await this.selectRow(clan.id, customId, filterType)],
            ephemeral: true
        }
        return this.followUp({replyData, data})
    }
}