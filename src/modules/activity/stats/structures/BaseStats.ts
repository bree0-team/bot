import {
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import _ from 'lodash'
import {TickEmoji} from '../../../../enums/TickEmoji.enum.js'
import {duration, messages} from '../../../../helpers/counts.js'
import {GuildEmbed} from '../../../../helpers/embed.js'
import {BaseStructure} from '../../../../structures/base.js'
import {
    ActionButtonRow,
    ActionStringSelectRow,
    ButtonRowBuilder,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {CustomId} from '../../../../types/base.type.js'
import {AfterLookBack} from '../enums/AfterLookBack.enum.js'
import {AfterDates} from '../helpers/afterDates.js'

interface ButtonIds {
    id: CustomId
    emoji: string
}

export abstract class BaseStats extends BaseStructure {
    readonly date = new AfterDates()
    getLookBack = (after: string) =>
        this.date.getDate(Number(after) ? Number(after) : AfterLookBack[after] )
    dateRow(customId: CustomId, after: string): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({customId}).setOptions(
            ...['day', 'week', 'month'].map(i => new StringSelectMenuOptionBuilder({
                label: this.t('stats:lookback:' + i),
                value: i,
                default: after === i
            })),
            ..._.range(1, 15).map(i => new StringSelectMenuOptionBuilder({
                label: this.getLocaleDate(this.date.getDate(i)),
                value: i.toString(),
                default: Number(after) === i
            }))
        )
        return StringSelectRowBuilder(select)
    }
    buttons(refreshId: CustomId, inters?: ButtonIds[]): ActionButtonRow {
        const buttons: ButtonBuilder[] = []
        if (inters?.length) buttons.push(...inters.map(i => new ButtonBuilder({
            customId: i.id,
            style: ButtonStyle.Secondary,
            emoji: i.emoji
        })))
        buttons.push(new ButtonBuilder({
            customId: refreshId,
            style: ButtonStyle.Secondary,
            emoji: TickEmoji.REFRESH
        }))
        return ButtonRowBuilder(...buttons)
    }
    embed(arg: any, after: string): EmbedBuilder {
        const lookBack = Number(after)
            ? this.getLocaleDate(this.date.getDate(Number(after)))
            : this.t('stats:lookback:' + after)
        return GuildEmbed(this.guildId)
            .setFooter({text: this.t('stats:after') + ': ' + lookBack})
    }
    messages = (count: number): string => messages(this.i, count)
    duration = (count: number): string => duration(this.i, count)
}