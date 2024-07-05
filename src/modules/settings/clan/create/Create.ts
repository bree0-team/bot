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
import {CREATE_ALLOWED_ROLES, CREATE_SELECT} from './enums/CustomIds.enum.js'
import {WhoCreate} from './enums/WhoCreate.enum.js'
import SettingsClanCreateManager from './managers/settings-clan-create.manager.js'

export class Create extends BaseSettingsClan {
    typeRow(value: WhoCreate): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: CREATE_SELECT
        }).setOptions(
            new StringSelectMenuOptionBuilder({
                label: this.t('settings:clan:create:members'),
                value: WhoCreate.MEMBER,
                default: WhoCreate.MEMBER === value
            }),
            new StringSelectMenuOptionBuilder({
                label: this.t('settings:clan:create:allowed_roles'),
                value: WhoCreate.ROLES,
                default: WhoCreate.ROLES === value
            }),
        )
        return StringSelectRowBuilder(select)
    }
    rolesRow(roles: RoleId[]): ActionRoleSelectRow {
        const select = new RoleSelectMenuBuilder({
            customId: CREATE_ALLOWED_ROLES,
            placeholder: this.t('select:roles'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        }).setDefaultRoles(...(roles || defaultRoles))
        return RoleSelectRowBuilder(select)
    }
    async run() {
        const createManager = await SettingsClanCreateManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription(
                [
                    this.t('settings:clan:create:description'),
                    '',
                    RadioEmoji(createManager.who === WhoCreate.MEMBER) + ' '
                    + this.t('settings:clan:create:members'),
                    RadioEmoji(createManager.who === WhoCreate.ROLES) + ' '
                    + this.t('settings:clan:create:allowed_roles'),
                    '',
                    bold(this.t('settings:clan:create:roles') + ': '),
                    (createManager.roles?.length ? createManager.roles.map(i => roleMention(i)).join(', ')
                        : this.t('no')),
                ].join('\n')
            )
            .setFooter({text: this.t('settings:clan:create:admin_have_rights')})
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