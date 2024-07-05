import {bold, InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import {DiscordEmoji} from '../../../../enums/DiscordEmoji.enum.js'
import {CheckEmoji} from '../../../../helpers/buttons.js'
import {
    ActionStringSelectRow,
    InteractionReplyComponent,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {defaultChannelsData} from '../constants/defaults.js'
import {ITEM_DELETE, ITEM_EDIT_GRAPH, ITEMS_SELECT} from '../enums/CustomIds.enum.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BaseSettingsBanner} from '../structures/BaseSettingsBanner.js'
import {BannerChannelsData, BannerChannelsType} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'
import {CHANNELS_TYPES} from './enums/CustomIds.enum.js'

const emoji: Record<BannerChannelsType, DiscordEmoji> = {
    [BannerChannelsType.Text]: DiscordEmoji.TextChannel,
    [BannerChannelsType.Voice]: DiscordEmoji.VoiceChannel,
    [BannerChannelsType.Category]: DiscordEmoji.CategoryChannel,
}

export class Channels extends BaseSettingsBanner {
    private channelsRow(types: BannerChannelsType[]): ActionStringSelectRow {
        const values = Object.values(BannerChannelsType)
        const select = new StringSelectMenuBuilder({
            customId: CHANNELS_TYPES,
            minValues: 1, maxValues: values.length
        }).setOptions(values.map(i => new StringSelectMenuOptionBuilder({
            emoji: emoji[i],
            label: this.t('settings:banner:channels:types:' + i),
            value: i,
            default: types.includes(i)
        })))
        return StringSelectRowBuilder(select)
    }
    async run(itemId?: number) {
        if (!itemId) {
            const item = await SettingsBannerDataManager
                .create(this.guildId, defaultChannelsData)
            return this.run(item.id)
        }
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerChannelsData>(itemId)
        const {
            channelTypes, x, y, scale, color,
            position
        } = bannerManager.data
        const embed = this.embedWithFields(x, y, scale, color)
            .setDescription([
                bold(this.t('settings:banner:channels:description') + ':'),
                Object.values(BannerChannelsType).map(i => CheckEmoji(channelTypes.includes(i))
                    + ' ' + this.t('settings:banner:channels:types:' + i)).join('\n')
            ].join('\n'))
        const attachment = await this.addEmbedAttachment(embed)
        const components: InteractionReplyComponent[] = [
            this.channelsRow(channelTypes),
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