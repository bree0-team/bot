import {bold, InteractionReplyOptions, roleMention, RoleSelectMenuBuilder} from 'discord.js'
import {DiscordLimits} from '../../../enums/DiscordLimits.enum.js'
import {ActionRoleSelectRow, InteractionReplyComponent, RoleSelectRowBuilder} from '../../../services/interaction.js'
import {RoleId} from '../../../types/base.type.js'
import {MAIN_SELECT} from '../enums/CustomIds.enum.js'
import {ROLES_ROLE, ROLES_ROLES} from './enums/CustomIds.enum.js'
import SettingsRolesManager from './managers/settings-roles.manager.js'
import {BaseSettingsRoles} from './structures/BaseSettingsRoles.js'
import {RolesData} from './types/data.type.js'

export class Roles extends BaseSettingsRoles {
    roleRow(roleId?: RoleId): ActionRoleSelectRow {
        const select = new RoleSelectMenuBuilder({
            customId: ROLES_ROLE,
            placeholder: this.t('select:role')
        })
        if (roleId) select.setDefaultRoles(roleId)
        return RoleSelectRowBuilder(select)
    }
    rolesRow(roleIds?: RoleId[]): ActionRoleSelectRow {
        const select = new RoleSelectMenuBuilder({
            customId: ROLES_ROLES,
            placeholder: this.t('select:roles'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        })
        if (roleIds?.length) select.setDefaultRoles(...roleIds)
        return RoleSelectRowBuilder(select)
    }
    async run(roleId?: RoleId) {
        const rolesManager = SettingsRolesManager.findOne(this.guildId, roleId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:roles'),
                '',
                bold(this.t('roles') + ':'),
                rolesManager?.roles.map(i => roleMention(i)).join(', ') ?? this.t('no')
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.roleRow(roleId),
            this.back(MAIN_SELECT)
        ]
        if (roleId) components.splice(1, 0, this.rolesRow(rolesManager?.roles))
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: RolesData = {roleId}
        return this.reply({replyData, data})
    }
}