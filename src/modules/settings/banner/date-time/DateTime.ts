import {bold, InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import {RadioEmoji} from '../../../../helpers/buttons.js'
import {
    ActionStringSelectRow,
    InteractionReplyComponent,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {defaultDateTimeData} from '../constants/defaults.js'
import {ITEM_DELETE, ITEM_EDIT_GRAPH, ITEMS_SELECT} from '../enums/CustomIds.enum.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BaseSettingsBanner} from '../structures/BaseSettingsBanner.js'
import {BannerDateTimeData, DateTimeConst, DateTimeStyles} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'
import {STYLES_SELECT} from './enums/CustomIds.enum.js'

export class DateTime extends BaseSettingsBanner {
    private styleRow(style: DateTimeStyles): ActionStringSelectRow {
        const values = Object.values(DateTimeConst)
        const select = new StringSelectMenuBuilder({customId: STYLES_SELECT})
            .setOptions(values.map(i => new StringSelectMenuOptionBuilder({
                label: this.t('settings:banner:date_time:styles:' + i),
                value: i,
                default: style === i
            })))
        return StringSelectRowBuilder(select)
    }
    async run(itemId?: number) {
        if (!itemId) {
            const item = await SettingsBannerDataManager
                .create(this.guildId, defaultDateTimeData)
            return this.run(item.id)
        }
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerDateTimeData>(itemId)
        const {
            style, x, y, scale, color, position
        } = bannerManager.data
        const embed = this.embedWithFields(x, y, scale, color)
            .setDescription([
                bold(this.t('settings:banner:date_time:description') + ':'),
                Object.values(DateTimeConst).map(i => RadioEmoji(style === i) + ' '
                    + this.t('settings:banner:date_time:styles:' + i)).join('\n')
            ].join('\n'))
        const attachment = await this.addEmbedAttachment(embed)
        const components: InteractionReplyComponent[] = [
            this.styleRow(style),
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