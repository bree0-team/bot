import {
    bold,
    ButtonBuilder,
    ButtonStyle,
    channelMention,
    ChannelSelectMenuBuilder,
    ChannelType,
    InteractionReplyOptions,
    roleMention,
    RoleSelectMenuBuilder
} from 'discord.js'
import {DiscordLimits} from '../../../enums/DiscordLimits.enum.js'
import {titleCase} from '../../../helpers/title.js'
import {
    ActionChannelSelectRow,
    ActionRoleSelectRow,
    ChannelSelectRowBuilder,
    InteractionReplyComponent,
    RoleSelectRowBuilder
} from '../../../services/interaction.js'
import {ChannelId, RoleId} from '../../../types/base.type.js'
import {MAIN_SELECT} from '../enums/CustomIds.enum.js'
import {MUN_CHANNEL, MUN_EDIT, MUN_ROLES, MUN_SEND} from './enums/CustomIds.enum.js'
import SettingsMunManager from './managers/settings-mun.manager.js'
import {BaseSettingsMun} from './structures/BaseSettingsMun.js'

export class Mun extends BaseSettingsMun {
    channelRow(channelId?: ChannelId): ActionChannelSelectRow {
        const select = new ChannelSelectMenuBuilder({
            customId: MUN_CHANNEL,
            placeholder: this.t('select:channel'),
            channelTypes: [ChannelType.GuildText]
        })
        if (channelId) select.setDefaultChannels(channelId)
        return ChannelSelectRowBuilder(select)
    }
    rolesRow(roleIds?: RoleId[]): ActionRoleSelectRow {
        const select = new RoleSelectMenuBuilder({
            customId: MUN_ROLES,
            placeholder: this.t('select:roles'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        })
        if (roleIds.length) select.setDefaultRoles(...roleIds)
        return RoleSelectRowBuilder(select)
    }
    async run() {
        const munManager = await SettingsMunManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:mun:description'),
                '',
                bold(titleCase(this.t('counts:channels')) + ': ') + channelMention(munManager.channelId),
                '',
                bold(this.t('settings:mun:roles') + ':'),
                munManager.roles.map(i => roleMention(i)).join(', ') || this.t('no'),
                '',
                bold(this.t('embed:body:options:title') + ': ') + (munManager.title || this.t('no')),
                bold(this.t('embed:body:options:description') + ': ')
                + (munManager.description || this.t('no'))
            ].join('\n'))
        const buttons = [
            new ButtonBuilder({
                customId: MUN_SEND,
                style: ButtonStyle.Success,
                label: this.t('settings:send_interface'),
                disabled: !munManager.channelId
            }),
            this.editButton(MUN_EDIT)
        ]
        const components: InteractionReplyComponent[] = [
            this.channelRow(munManager.channelId),
            this.rolesRow(munManager.roles),
            this.back(MAIN_SELECT, buttons)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}