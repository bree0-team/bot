import {bold, InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import {CheckEmoji} from '../../../../helpers/buttons.js'
import {
    ActionStringSelectRow,
    InteractionReplyComponent,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {defaultMembersDate} from '../constants/defaults.js'
import {ITEM_DELETE, ITEM_EDIT_GRAPH, ITEMS_SELECT} from '../enums/CustomIds.enum.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BaseSettingsBanner} from '../structures/BaseSettingsBanner.js'
import {BannerMembersData, BannerMembersType} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'
import {MEMBER_TYPE_SELECT} from './enums/CustomIds.enum.js'

export class Members extends BaseSettingsBanner {
    private typesRow(types: BannerMembersType[]): ActionStringSelectRow {
        const values = Object.values(BannerMembersType)
        const select = new StringSelectMenuBuilder({
            customId: MEMBER_TYPE_SELECT,
            minValues: 1, maxValues: values.length
        }).setOptions(values.map(i => new StringSelectMenuOptionBuilder({
            label: this.t('settings:banner:members:types:' + i),
            value: i,
            default: types.includes(i)
        })))
        return StringSelectRowBuilder(select)
    }
    async run(itemId?: number) {
        if (!itemId) {
            const item = await SettingsBannerDataManager
                .create(this.guildId, defaultMembersDate)
            return this.run(item.id)
        }
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerMembersData>(itemId)
        const {
            memberTypes, x, y, scale, color,
            position
        } = bannerManager.data
        const embed = this.embedWithFields(x, y, scale, color)
            .setDescription([
                bold(this.t('settings:banner:members:description') + ':'),
                Object.values(BannerMembersType).map(i => CheckEmoji(memberTypes.includes(i))
                    + ' ' + this.t('settings:banner:members:types:' + i)).join('\n')
            ].join('\n'))
        const attachment = await this.addEmbedAttachment(embed)
        const components: InteractionReplyComponent[] = [
            this.typesRow(memberTypes),
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