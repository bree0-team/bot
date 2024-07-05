import {
    bold,
    ButtonBuilder,
    ButtonStyle,
    channelMention,
    ChannelSelectMenuBuilder,
    ChannelType,
    inlineCode,
    InteractionReplyOptions,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import _ from 'lodash'
import {ClanRankEmoji} from '../../../../enums/ClanRankEmoji.enum.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {InteractionEmoji} from '../../../../enums/InteractionEmoji.enum.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {
    ActionChannelSelectRow,
    ActionStringSelectRow,
    ChannelSelectRowBuilder,
    InteractionReplyComponent,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {ClanRank} from '../../../clan/enums/ClanRank.enum.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {BaseSettingsClan} from '../structures/BaseSettingsClan.js'
import {ChannelRankAccessData} from '../types/data.type.js'
import {
    CHANNEL_CATEGORY,
    CHANNEL_EDIT_LIMIT,
    CHANNEL_RANK,
    CHANNEL_RIGHTS,
    CHANNEL_SEND_CONFIRM
} from './enums/CustomIds.enum.js'
import SettingsClanChannelRankAccessManager from './managers/settings-clan-channel-rank-access.manager.js'
import SettingsClanChannelManager from './managers/settings-clan-channel.manager.js'
import {AllChannelAccess, AllChannelRights} from './types/rights.type.js'

type ListFields = [ClanRank, AllChannelAccess[]]

export class Channel extends BaseSettingsClan {
    categoryRow(categoryId?: ChannelId): ActionChannelSelectRow {
        const select = new ChannelSelectMenuBuilder({
            customId: CHANNEL_CATEGORY,
            placeholder: this.t('select:channel'),
            channelTypes: [ChannelType.GuildCategory],
        })
        if (categoryId) select.setDefaultChannels(categoryId)
        return ChannelSelectRowBuilder(select)
    }
    rankRow(value?: ClanRank): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: CHANNEL_RANK,
            placeholder: this.t('settings:clan:select_rank'),
        }).setOptions(
            _.map(ClanRank, i => new StringSelectMenuOptionBuilder({
                emoji: ClanRankEmoji[i],
                label: this.t('clan:' + i),
                value: i,
                default: i === value,
            }))
        )
        return StringSelectRowBuilder(select)
    }
    rightsRow(rank?: ClanRank, values?: AllChannelAccess[]): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: CHANNEL_RIGHTS,
            placeholder: this.t('select:rights'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: _.size(AllChannelRights),
            disabled: !rank,
        }).setOptions(
            _.map(AllChannelRights, i => new StringSelectMenuOptionBuilder({
                label: this.t('settings:clan:channel:options:' + i),
                value: i,
                default: _.includes(values, i),
            }))
        )
        return StringSelectRowBuilder(select)
    }
    async run(rank?: ClanRank, rights?: AllChannelAccess[]) {
        const channelManager = await SettingsClanChannelManager.getOne(this.guildId)
        const {
            owner,
            chief,
            captain,
            recruiter,
            member
        } = await SettingsClanChannelRankAccessManager.getOne(this.guildId)
        const entries = {owner, chief, captain, recruiter, member}
        const fields: EmbedField[] = Object.entries(entries)
            .map(([name, value]: ListFields) => EmbedField(this.t('clan:' + name.toUpperCase()), value
                .map(i => InteractionEmoji.MINUS + ' '
                    + this.t('settings:clan:channel:options:' + i)).join('\n') || this.t('no')))
        const embed = this.embed()
            .setDescription([
                this.t('settings:clan:channel:description'),
                '',
                bold(this.t('settings:clan:channel:category:for_create') + ': ')
                + (channelManager.categoryId ? channelMention(channelManager.categoryId) : this.t('no')),
                bold(this.t('settings:clan:channel:edit_limit:description') + ': ')
                + inlineCode(channelManager.limit.toString())
            ].join('\n'))
            .addFields(...fields)
        const buttons = [
            new ButtonBuilder()
                .setCustomId(CHANNEL_SEND_CONFIRM)
                .setStyle(ButtonStyle.Success)
                .setLabel(this.t('settings:send_interface'))
                .setDisabled(!channelManager.categoryId),
            new ButtonBuilder()
                .setCustomId(CHANNEL_EDIT_LIMIT)
                .setStyle(ButtonStyle.Primary)
                .setLabel(this.t('settings:clan:channel:edit_limit:button'))
        ]
        const components: InteractionReplyComponent[] = [
            this.select(SettingsClanSelectValuesCustomIds.Channel),
            this.categoryRow(channelManager.categoryId),
            this.rankRow(rank),
            this.rightsRow(rank, rights),
            this.back(MAIN_SELECT, buttons)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: ChannelRankAccessData = {rank, rights}
        return this.reply({replyData, data})
    }
}