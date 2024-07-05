import {
    bold,
    channelMention,
    ChannelSelectMenuBuilder,
    ChannelType,
    InteractionReplyOptions,
    roleMention,
    RoleSelectMenuBuilder
} from 'discord.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {
    ActionChannelSelectRow,
    ActionRoleSelectRow,
    ChannelSelectRowBuilder,
    InteractionReplyComponent,
    RoleSelectRowBuilder
} from '../../../../services/interaction.js'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {XpSelectValues} from '../enums/CustomIds.enum.js'
import SettingsXpManager from '../managers/settings-xp.manager.js'
import {BaseSettingsXp} from '../structures/BaseSettingsXp.js'
import {XP_CHANNELS, XP_ROLES} from './enums/CustomIds.enum.js'

export class Ignored extends BaseSettingsXp {
    channelsRow(channels?: ChannelId[]): ActionChannelSelectRow {
        const select = new ChannelSelectMenuBuilder({
            customId: XP_CHANNELS,
            placeholder: this.t('select:channels'),
            channelTypes: [
                ChannelType.GuildText,
                ChannelType.GuildVoice,
                ChannelType.GuildAnnouncement,
                ChannelType.GuildStageVoice
            ],
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        })
        if (channels) select.setDefaultChannels(...channels)
        return ChannelSelectRowBuilder(select)
    }
    rolesRow(roles?: RoleId[]): ActionRoleSelectRow {
        const select = new RoleSelectMenuBuilder({
            customId: XP_ROLES,
            placeholder: this.t('select:roles'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        })
        if (roles) select.setDefaultRoles(...roles)
        return RoleSelectRowBuilder(select)
    }
    async run() {
        const xpManager = await SettingsXpManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                bold(this.t('ignored:channels') + ': '),
                (xpManager.channels.length ? xpManager.channels.map(i => channelMention(i)).join(', ')
                    : this.t('no')),
                '',
                bold(this.t('ignored:roles') + ': '),
                (xpManager.roles.length ? xpManager.roles.map(i => roleMention(i)).join(', ')
                    : this.t('no'))
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.select(XpSelectValues.Ignored),
            this.channelsRow(xpManager.channels),
            this.rolesRow(xpManager.roles),
            this.back(MAIN_SELECT)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}