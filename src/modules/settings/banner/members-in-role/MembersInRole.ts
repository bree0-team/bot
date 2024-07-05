import {bold, InteractionReplyOptions, roleMention, RoleSelectMenuBuilder} from 'discord.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {CheckEmoji} from '../../../../helpers/buttons.js'
import {ActionRoleSelectRow, InteractionReplyComponent, RoleSelectRowBuilder} from '../../../../services/interaction.js'
import {RoleId} from '../../../../types/base.type.js'
import {defaultMembersInRoleData} from '../constants/defaults.js'
import {ITEM_DELETE, ITEM_EDIT_GRAPH, ITEMS_SELECT} from '../enums/CustomIds.enum.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BaseSettingsBannerStatus} from '../structures/BaseSettingsBannerStatus.js'
import {BannerMembersInRoleData, BannerMembersWithStatusType} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'
import {ROLES_SELECT, STATUS_SELECT} from './enums/CustomIds.enum.js'

export class MembersInRole extends BaseSettingsBannerStatus {
    private rolesRow(roles: RoleId[]): ActionRoleSelectRow {
        const select = new RoleSelectMenuBuilder({
            customId: ROLES_SELECT,
            placeholder: this.t('select:roles'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        })
        if (roles.length) select.setDefaultRoles(...roles)
        return RoleSelectRowBuilder(select)
    }
    async run(itemId?: number) {
        if (!itemId) {
            const item = await SettingsBannerDataManager
                .create(this.guildId, defaultMembersInRoleData)
            return this.run(item.id)
        }
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerMembersInRoleData>(itemId)
        const {
            roles, statuses, x, y, scale,
            color, position
        } = bannerManager.data
        // todo
        const embed = this.embedWithFields(x, y, scale, color)
            .setDescription([
                bold(this.t('roles') + ':'),
                roles.map(i => roleMention(i)).join(', ') || this.t('no'),
                '',
                bold(this.t('settings:banner:statuses') + ':'),
                Object.values(BannerMembersWithStatusType).map(i =>
                    CheckEmoji(statuses.includes(i)) + ' ' + this.t('statuses:' + i)).join('\n')
            ].join('\n'))
        const attachment = await this.addEmbedAttachment(embed)
        const components: InteractionReplyComponent[] = [
            this.rolesRow(roles),
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