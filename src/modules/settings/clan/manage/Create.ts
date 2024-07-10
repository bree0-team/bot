import {
    bold,
    InteractionReplyOptions,
    roleMention,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
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
import {SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {BaseSettingsClan} from '../structures/BaseSettingsClan.js'
import {defaultRoles} from './constants/defaults.js'
import {MANAGE_ALLOWED_ROLES, MANAGE_SELECT} from './enums/CustomIds.enum.js'
import {WhoManage} from './enums/WhoManage.enum.js'
import SettingsClanManageManager from './managers/settings-clan-manage.manager.js'

export class Create extends BaseSettingsClan {
    typeRow(value: WhoManage): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: MANAGE_SELECT
        }).setOptions(
            new StringSelectMenuOptionBuilder({
                label: this.t('settings:clan:manage:members'),
                value: WhoManage.MEMBER,
                default: WhoManage.MEMBER === value
            }),
            new StringSelectMenuOptionBuilder({
                label: this.t('settings:clan:manage:allowed_roles'),
                value: WhoManage.ROLES,
                default: WhoManage.ROLES === value
            }),
        )
        return StringSelectRowBuilder(select)
    }
    rolesRow(roles: RoleId[]): ActionRoleSelectRow {
        const select = new RoleSelectMenuBuilder({
            customId: MANAGE_ALLOWED_ROLES,
            placeholder: this.t('select:roles'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        }).setDefaultRoles(...(roles || defaultRoles))
        return RoleSelectRowBuilder(select)
    }
    async run() {
        const createManager = await SettingsClanManageManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription(
                [
                    this.t('settings:clan:manage:description'),
                    '',
                    RadioEmoji(createManager.who === WhoManage.MEMBER) + ' '
                    + this.t('settings:clan:manage:members'),
                    RadioEmoji(createManager.who === WhoManage.ROLES) + ' '
                    + this.t('settings:clan:manage:allowed_roles'),
                    '',
                    bold(this.t('settings:manage:create:roles') + ': '),
                    (createManager.roles?.length ? createManager.roles.map(i => roleMention(i)).join(', ')
                        : this.t('no')),
                ].join('\n')
            )
            .setFooter({text: this.t('settings:clan:manage:admin_have_rights')})
        const components: InteractionReplyComponent[] = [
            this.select(SettingsClanSelectValuesCustomIds.Create),
            this.typeRow(createManager.who),
            this.rolesRow(createManager.roles),
            this.back(MAIN_SELECT)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}