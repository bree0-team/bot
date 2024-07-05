import {bold, channelMention, ChannelSelectMenuBuilder, ChannelType, InteractionReplyOptions} from 'discord.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {
    ActionChannelSelectRow,
    ChannelSelectRowBuilder,
    InteractionReplyComponent
} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {defaultVoice} from '../constants/defaults.js'
import {ITEM_DELETE, ITEM_EDIT_GRAPH, ITEMS_SELECT} from '../enums/CustomIds.enum.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BaseSettingsBanner} from '../structures/BaseSettingsBanner.js'
import {BannerVoiceData} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'
import {CHANNELS_SELECT} from './enums/CustomIds.enum.js'

export class Voice extends BaseSettingsBanner {
    private channelsRow(channels: ChannelId[]): ActionChannelSelectRow {
        const select = new ChannelSelectMenuBuilder({
            customId: CHANNELS_SELECT,
            placeholder: this.t('select:channels'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN,
            channelTypes: [ChannelType.GuildVoice]
        })
        if (channels.length) select.setDefaultChannels(...channels)
        return ChannelSelectRowBuilder(select)
    }
    async run(itemId?: number) {
        if (!itemId) {
            const item = await SettingsBannerDataManager
                .create(this.guildId, defaultVoice)
            return this.run(item.id)
        }
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerVoiceData>(itemId)
        const {
            channels, x, y, scale, color, position
        } = bannerManager.data
        const embed = this.embedWithFields(x, y, scale, color)
            .setDescription([
                bold(this.t('settings:banner:voice') + ':'),
                channels.map(i => channelMention(i)).join(', ') || this.t('no')
            ].join('\n'))
        const attachment = await this.addEmbedAttachment(embed)
        const components: InteractionReplyComponent[] = [
            this.channelsRow(channels),
            this.positionRow(position),
            this.back(ITEMS_SELECT, [
                this.editButton(ITEM_EDIT_GRAPH),
                this.deleteButton(ITEM_DELETE)
            ])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components, files: [attachment]}
        const data: BannerItemData = {itemId}
        return this.reply({replyData, data})
    }
}