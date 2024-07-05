import {
    bold,
    ButtonBuilder,
    ButtonStyle,
    InteractionReplyOptions,
    roleMention,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import _ from 'lodash'
import {RadioEmoji} from '../../../../helpers/buttons.js'
import {
    ActionRoleSelectRow,
    ActionStringSelectRow,
    InteractionReplyComponent,
    RoleSelectRowBuilder,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {RoleId} from '../../../../types/base.type.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {XpSelectValues} from '../enums/CustomIds.enum.js'
import {RewardType} from '../enums/RewardType.enum.js'
import SettingsXpManager from '../managers/settings-xp.manager.js'
import {BaseSettingsXp} from '../structures/BaseSettingsXp.js'
import {REWARD_ADD_ROLE, REWARD_DEL_ROLE, REWARD_EDIT_ROLE, REWARD_ROLES, REWARD_TYPE} from './enums/CustomIds.enum.js'
import {RewardRoleData} from './types/data.type.js'

export class Rewards extends BaseSettingsXp {
    stackedRow(value: RewardType): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({customId: REWARD_TYPE})
            .setOptions(_.map(RewardType, i => new StringSelectMenuOptionBuilder({
                label: this.t('settings:xp:rewards:types:' + i),
                value: i,
                default: i === value
            })))
        return StringSelectRowBuilder(select)
    }
    rolesRow(roleId?: RoleId): ActionRoleSelectRow {
        const select = new RoleSelectMenuBuilder({
            customId: REWARD_ROLES,
            placeholder: this.t('select:role')
        })
        if (roleId) select.setDefaultRoles(roleId)
        return RoleSelectRowBuilder(select)
    }
    buttons(roleId?: RoleId, exist?: boolean): ButtonBuilder[] {
        const buttons: ButtonBuilder[] = []
        if (roleId) {
            if (exist) buttons.push(
                new ButtonBuilder({
                    customId: REWARD_EDIT_ROLE,
                    style: ButtonStyle.Primary,
                    label: this.t('edit')
                }),
                new ButtonBuilder({
                    customId: REWARD_DEL_ROLE,
                    style: ButtonStyle.Danger,
                    label: this.t('delete')
                })
            )
            else buttons.push(
                new ButtonBuilder({
                    customId: REWARD_ADD_ROLE,
                    style: ButtonStyle.Success,
                    label: this.t('add')
                })
            )
        }
        return buttons
    }
    async run(roleId?: RoleId) {
        const xpManager = await SettingsXpManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:xp:rewards:description'),
                '',
                bold(this.t('settings:xp:rewards:type') + ':'),
                _.map(RewardType, i => RadioEmoji(i === xpManager.rewardType) + ' '
                    + this.t('settings:xp:rewards:types:' + i)).join('\n'),
                '',
                Object.entries(xpManager.rewardRole).map(([level, roles]) => [
                    bold(this.t('level') + ' ' + level + ':'),
                    roles.map(roleId => roleMention(roleId)).join('\n')
                ].join('\n')).join('\n\n')
            ].join('\n'))
        const roleIds: RoleId[] = Object.values(xpManager.rewardRole)
            .reduce((acc, userIds) => [...acc, ...userIds], [])
        const uniqueRoleIds: RoleId[] = [...new Set(roleIds)]
        const components: InteractionReplyComponent[] = [
            this.select(XpSelectValues.Rewards),
            this.stackedRow(xpManager.rewardType),
            this.rolesRow(roleId),
            this.back(MAIN_SELECT, this.buttons(roleId, uniqueRoleIds.includes(roleId)))
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: RewardRoleData = {roleId}
        return this.reply({replyData, data})
    }
}