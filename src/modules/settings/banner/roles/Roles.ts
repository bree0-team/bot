import {bold, InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import {CheckEmoji} from '../../../../helpers/buttons.js'
import {
    ActionStringSelectRow,
    InteractionReplyComponent,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {defaultRoles} from '../constants/defaults.js'
import {ITEM_DELETE, ITEM_EDIT_GRAPH, ITEMS_SELECT} from '../enums/CustomIds.enum.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BaseSettingsBanner} from '../structures/BaseSettingsBanner.js'
import {BannerRolesData, BannerRolesType} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'
import {ROLE_TYPE_SELECT} from './enums/CustomIds.enum.js'

export class Roles extends BaseSettingsBanner {
    private rolesRow(types: BannerRolesType[]): ActionStringSelectRow {
        const values = Object.values(BannerRolesType)
        const select = new StringSelectMenuBuilder({
            customId: ROLE_TYPE_SELECT,
            minValues: 1, maxValues: values.length
        }).setOptions(values.map(i => new StringSelectMenuOptionBuilder({
            label: this.t('settings:banner:roles:types:' + i),
            value: i,
            default: types.includes(i)
        })))
        return StringSelectRowBuilder(select)
    }
    async run(itemId?: number) {
        if (!itemId) {
            const item = await SettingsBannerDataManager
                .create(this.guildId, defaultRoles)
            return this.run(item.id)
        }
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerRolesData>(itemId)
        const {
            roleTypes, x, y, scale, color, align,
            valign
        } = bannerManager.data
        const embed = this.embedWithFields(x, y, scale, color)
            .setDescription([
                bold(this.t('settings:banner:roles:description') + ':'),
                Object.values(BannerRolesType).map(i => CheckEmoji(roleTypes.includes(i)) + ' '
                    + this.t('settings:banner:roles:types:' + i)).join('\n')
            ].join('\n'))
        const attachment = await this.addEmbedAttachment(embed)
        const components: InteractionReplyComponent[] = [
            this.rolesRow(roleTypes),
            this.alignRow(align),
            this.valignRow(valign),
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