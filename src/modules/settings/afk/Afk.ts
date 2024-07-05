import {
    bold,
    channelMention,
    ChannelSelectMenuBuilder,
    ChannelType,
    InteractionReplyOptions,
    roleMention,
    RoleSelectMenuBuilder
} from 'discord.js'
import {DiscordLimits} from '../../../enums/DiscordLimits.enum.js'
import {SwitchEmoji} from '../../../helpers/buttons.js'
import {duration} from '../../../helpers/counts.js'
import {
    ActionChannelSelectRow,
    ActionRoleSelectRow,
    ChannelSelectRowBuilder,
    InteractionReplyComponent,
    RoleSelectRowBuilder
} from '../../../services/interaction.js'
import {ChannelId, RoleId} from '../../../types/base.type.js'
import {MAIN_SELECT} from '../enums/CustomIds.enum.js'
import {defaultSleep} from './constants/defaults.js'
import {
    AFK_CHANNELS_SELECT,
    AFK_ROLES_SELECT,
    AFK_SLEEP_EDIT,
    AFK_SLEEP_RESET,
    AFK_SWITCH
} from './enums/CustomIds.enum.js'
import SettingsAfkManager from './managers/settings-afk.manager.js'
import {BaseSettingsAfk} from './structures/BaseSettingsAfk.js'

export class Afk extends BaseSettingsAfk {
    channelsRow(channels?: ChannelId[]): ActionChannelSelectRow {
        const select = new ChannelSelectMenuBuilder({
            customId: AFK_CHANNELS_SELECT,
            placeholder: this.t('select:channels'),
            channelTypes: [ChannelType.GuildVoice, ChannelType.GuildStageVoice],
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        })
        if (channels) select.setDefaultChannels(...channels)
        return ChannelSelectRowBuilder(select)
    }
    rolesRow(roles?: RoleId[]): ActionRoleSelectRow {
        const select = new RoleSelectMenuBuilder({
            customId: AFK_ROLES_SELECT,
            placeholder: this.t('select:roles'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        })
        if (roles) select.setDefaultRoles(...roles)
        return RoleSelectRowBuilder(select)
    }
    async run() {
        const afkManager = await SettingsAfkManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:afk:description'),
                '',
                SwitchEmoji(afkManager.value) + ' ' + this.t('settings:options:afk'),
                '',
                bold(this.t('settings:afk:sleep') + ': ') + ' '
                + duration(this.i, afkManager.sleep),
                '',
                bold(this.t('settings:afk:channels') + ': '),
                (afkManager.channels.length ? afkManager.channels.map(i => channelMention(i)).join(', ')
                    : this.t('no')),
                '',
                bold(this.t('settings:afk:roles') + ': '),
                (afkManager.roles.length ? afkManager.roles.map(i => roleMention(i)).join(', ')
                    : this.t('no'))
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.channelsRow(afkManager.channels),
            this.rolesRow(afkManager.roles),
            this.back(MAIN_SELECT,[
                this.turnOnOff(AFK_SWITCH, afkManager.value),
                ...this.editReset(AFK_SLEEP_EDIT, AFK_SLEEP_RESET, afkManager.sleep === defaultSleep)
            ])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}