import {bold, InteractionReplyOptions} from 'discord.js'
import {CheckEmoji} from '../../../../helpers/buttons.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {defaultMembersWithStatusData} from '../constants/defaults.js'
import {ITEM_DELETE, ITEM_EDIT_GRAPH, ITEMS_SELECT} from '../enums/CustomIds.enum.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BaseSettingsBannerStatus} from '../structures/BaseSettingsBannerStatus.js'
import {BannerMembersWithStatusData, BannerMembersWithStatusType} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'
import {STATUS_SELECT} from './enums/CustomIds.enum.js'

export class MembersWithStatus extends BaseSettingsBannerStatus {
    async run(itemId?: number) {
        if (!itemId) {
            const item = await SettingsBannerDataManager
                .create(this.guildId, defaultMembersWithStatusData)
            return this.run(item.id)
        }
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerMembersWithStatusData>(itemId)
        const {
            statuses, x, y, scale, color,
            position
        } = bannerManager.data
        const embed = this.embedWithFields(x, y, scale, color)
            .setDescription([
                bold(this.t('settings:banner:statuses') + ':'),
                Object.values(BannerMembersWithStatusType).map(i =>
                    CheckEmoji(statuses.includes(i)) + ' ' + this.t('statuses:' + i)).join('\n')
            ].join('\n'))
        const attachment = await this.addEmbedAttachment(embed)
        const components: InteractionReplyComponent[] = [
            this.statusesRow(STATUS_SELECT, statuses),
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