import {
    bold,
    channelMention,
    ChannelSelectMenuBuilder,
    ChannelType,
    InteractionReplyOptions,
    roleMention,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import _ from 'lodash'
import {DiscordLimits} from '../../../enums/DiscordLimits.enum.js'
import {VoiceStatesEmoji} from '../../../enums/VoiceStatesEmoji.enum.js'
import {CheckEmoji, SwitchEmoji} from '../../../helpers/buttons.js'
import {
    ActionChannelSelectRow,
    ActionRoleSelectRow,
    ActionStringSelectRow,
    ChannelSelectRowBuilder,
    InteractionReplyComponent,
    RoleSelectRowBuilder,
    StringSelectRowBuilder
} from '../../../services/interaction.js'
import {ChannelId, RoleId} from '../../../types/base.type.js'
import {MAIN_SELECT} from '../enums/CustomIds.enum.js'
import {VoiceStates} from '../enums/VoiceStates.enum.js'
import {
    ACTIVITY_CHANNELS,
    ACTIVITY_MEMBER_TYPES,
    ACTIVITY_ROLES,
    ACTIVITY_SHOW_DELETED_SWITCH,
    ACTIVITY_VOICE_STATES
} from './enums/CustomIds.enum.js'
import {MemberType} from './enums/MemberType.enum.js'
import SettingsActivityManager from './managers/settings-activity.manager.js'
import {BaseSettingsActivity} from './structures/BaseSettingsActivity.js'

export class Activity extends BaseSettingsActivity {
    memberTypeRow(memberTypes?: MemberType[]): ActionStringSelectRow {
        const values = _.values(MemberType) as MemberType[]
        const select = new StringSelectMenuBuilder({
            customId: ACTIVITY_MEMBER_TYPES,
            placeholder: this.t('settings:activity:member_types:select'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: values.length
        }).setOptions(values.map(i => new StringSelectMenuOptionBuilder({
            label: this.t('settings:activity:member_types:' + i),
            value: i,
            default: memberTypes.includes(i)
        })))
        return StringSelectRowBuilder(select)
    }
    voiceStatesRow(voiceStates?: VoiceStates[]): ActionStringSelectRow {
        const values = _.values(VoiceStates) as VoiceStates[]
        const select = new StringSelectMenuBuilder({
            customId: ACTIVITY_VOICE_STATES,
            placeholder: this.t('select:voice_states:placeholder'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: values.length
        }).setOptions(values.map(i => new StringSelectMenuOptionBuilder({
            emoji: VoiceStatesEmoji[i],
            label: this.t('select:voice_states:' + i),
            value: i,
            default: voiceStates.includes(i)
        })))
        return StringSelectRowBuilder(select)
    }
    channelsRow(channels?: ChannelId[]): ActionChannelSelectRow {
        const select = new ChannelSelectMenuBuilder({
            customId: ACTIVITY_CHANNELS,
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
            customId: ACTIVITY_ROLES,
            placeholder: this.t('select:roles'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: DiscordLimits.SELECT_MAX_ITEM_CHOSEN
        })
        if (roles) select.setDefaultRoles(...roles)
        return RoleSelectRowBuilder(select)
    }
    async run() {
        const activityManager = await SettingsActivityManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:activity:description'),
                '',
                SwitchEmoji(activityManager.showDeleted) + ' ' + this.t('settings:activity:show_deleted'),
                '',
                bold(this.t('settings:activity:member_types:description') + ':'),
                _.map(MemberType, i =>
                    CheckEmoji(activityManager.memberTypes.includes(i)) + ' '
                    + this.t('settings:activity:member_types:' + i)).join('\n'),
                '',
                bold(this.t('voice_states') + ':'),
                _.map(VoiceStates, i =>
                    CheckEmoji(activityManager.voiceStates.includes(i)) + ' '
                    + this.t('select:voice_states:' + i)).join('\n'),
                '',
                bold(this.t('ignored:channels') + ': '),
                (activityManager.channels.length
                    ? activityManager.channels.map(i => channelMention(i)).join(', ')
                    : this.t('no')),
                '',
                bold(this.t('ignored:roles') + ': '),
                (activityManager.roles.length
                    ? activityManager.roles.map(i => roleMention(i)).join(', ')
                    : this.t('no'))
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.memberTypeRow(activityManager.memberTypes),
            this.voiceStatesRow(activityManager.voiceStates),
            this.channelsRow(activityManager.channels),
            this.rolesRow(activityManager.roles),
            this.back(MAIN_SELECT,[
                this.turnOnOff(ACTIVITY_SHOW_DELETED_SWITCH, activityManager.showDeleted),
            ])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}