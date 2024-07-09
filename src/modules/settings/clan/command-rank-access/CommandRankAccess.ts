import {InteractionReplyOptions, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import _ from 'lodash'
import {ClanRankEmoji} from '../../../../enums/ClanRankEmoji.enum.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {SelectEmoji} from '../../../../enums/SelectEmoji.enum.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {
    ActionStringSelectRow,
    InteractionReplyComponent,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {ClanRank} from '../../../clan/enums/ClanRank.enum.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import {BaseSettingsClan} from '../structures/BaseSettingsClan.js'
import {CommandRankAccessData} from '../types/data.type.js'
import {defaultNotAccess, defaultOwner} from './constants/defaults.js'
import {CRA_COMMAND, CRA_RANK} from './enums/CustomIds.enum.js'
import SettingsClanCommandRankAccessManager from './managers/settings-clan-command-rank-access.manager.js'
import {AllCommandsAccess} from './types/access.type.js'

type ListFields = [ClanRank, AllCommandsAccess[]]

export class CommandRankAccess extends BaseSettingsClan {
    rankRow(value?: ClanRank): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: CRA_RANK,
            placeholder: this.t('settings:clan:select_rank'),
        }).setOptions(
            _.map(ClanRank, i => new StringSelectMenuOptionBuilder({
                emoji: ClanRankEmoji[i],
                label: this.t('clan:' + i),
                value: i,
                default: i === value
            }))
        )
        return StringSelectRowBuilder(select)
    }
    commandRow(rank?: ClanRank, values?: AllCommandsAccess[]): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: CRA_COMMAND,
            placeholder: this.t('select:commands'),
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN,
            maxValues: defaultOwner.length,
            disabled: !rank
        }).setOptions(
            _.map(defaultOwner, i => new StringSelectMenuOptionBuilder({
                emoji: SelectEmoji.Command,
                label: i.replace('_', ' '),
                value: i,
                default: _.includes(values, i)
            }))
        )
        return StringSelectRowBuilder(select)
    }
    async run(rank?: ClanRank, commands?: AllCommandsAccess[]) {
        const {
            owner, chief, captain,
            recruiter, member
        } = await SettingsClanCommandRankAccessManager.getOne(this.guildId)
        const entries = {owner, chief, captain, recruiter, member}
        const fields: EmbedField[] = Object.entries(entries)
            .map(([name, value]: ListFields) => EmbedField(this.t('clan:' + name.toUpperCase()), value
                .map(i => `\`${i.replace('_', ' ')}\``)
                .join(', ') || this.t('no')))
        const embed = this.embed()
            .addFields(...fields, EmbedField(this.t('settings:clan:non_config_commands'), defaultNotAccess
                .map(i => `\`${i.replace('_', ' ')}\``).join(', ')))
        const components: InteractionReplyComponent[] = [
            this.select(SettingsClanSelectValuesCustomIds.CommandRankAccess),
            this.rankRow(rank),
            this.commandRow(rank, commands),
            this.back(MAIN_SELECT)
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: CommandRankAccessData = {rank}
        return this.reply({replyData, data})
    }
}