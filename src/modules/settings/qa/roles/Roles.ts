import {bold, InteractionReplyOptions, roleMention, RoleSelectMenuBuilder} from 'discord.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {ActionRoleSelectRow, InteractionReplyComponent, RoleSelectRowBuilder} from '../../../../services/interaction.js'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {QaSelectValues} from '../enums/CustomIds.enum.js'
import SettingsQaManager from '../managers/settings-qa.manager.js'
import {BaseSettingsQa} from '../structures/BaseSettingsQa.js'
import {QaData} from '../types/data.type.js'
import {QA_ROLES} from './enums/CustomIds.enum.js'

export class Roles extends BaseSettingsQa {
    protected rolesRow(roleIds?: RoleId[]): ActionRoleSelectRow {
        const select = new RoleSelectMenuBuilder({
            customId: QA_ROLES,
            placeholder: this.t('select:roles'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        })
        if (roleIds) select.setDefaultRoles(...roleIds)
        return RoleSelectRowBuilder(select)
    }
    async run(channelId: ChannelId) {
        const qaManager = SettingsQaManager.findOne(this.guildId, channelId)
        const embed = this.embed
            .setDescription([
                bold(this.t('settings:qa:options:roles') + ':'),
                qaManager.roles.map(i => roleMention(i)).join(', ') || this.t('no')
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.channelRow(channelId),
            this.select(QaSelectValues.Roles),
            this.rolesRow(qaManager.roles),
            this.back(MAIN_SELECT)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: QaData = {channelId}
        return this.reply({replyData, data})
    }
}