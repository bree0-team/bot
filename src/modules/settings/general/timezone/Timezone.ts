import {
    bold,
    codeBlock,
    InteractionReplyOptions,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import {
    ActionStringSelectRow,
    InteractionReplyComponent,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {PageData} from '../../../../types/data.type.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsGeneralSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import SettingsGeneralManager from '../managers/settings-general.manager.js'
import {BaseSettingsGeneral} from '../structures/BaseSettingsGeneral.js'
import {TIMEZONE_INDEX, TIMEZONE_NEXT, TIMEZONE_PREV, TIMEZONE_SELECT} from './enums/CustomIds.enum.js'

interface ItemsPages {
    items: string[]
    pages: number
}

export class Timezone extends BaseSettingsGeneral {
    getItems(page: number, limit: number = 25): ItemsPages {
        let items: string[] = (Intl as any).supportedValuesOf('timeZone')
        items.splice(0, 0, 'UTC', 'GMT')
        items = items.sort((a, b) => (a < b ? -1 : 1))
        return {items: items.slice(page*limit, page*limit+limit), pages: Math.ceil(items.length/limit)}
    }
    timezoneRow(timezones: string[], timezone: string): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({customId: TIMEZONE_SELECT})
            .setOptions(timezones.map(i => new StringSelectMenuOptionBuilder({
                label: i,
                value: i,
                default: timezone === i
            })))
        return StringSelectRowBuilder(select)
    }
    async run(page: number = 0) {
        const {timezone} = await SettingsGeneralManager.getOne(this.guildId)
        const embed = this.embed
            .setDescription([
                this.t('settings:general:timezone'),
                '',
                bold(this.t('settings:general:options:timezone') + ':'),
                codeBlock(timezone)
            ].join('\n'))
        const {items, pages} = this.getItems(page)
        const components: InteractionReplyComponent[] = [
            this.select(SettingsGeneralSelectValuesCustomIds.TimeZone),
            this.timezoneRow(items, timezone)
        ]
        const paginator = this.paginator({
            page, size: pages,
            prevId: TIMEZONE_PREV, indexId: TIMEZONE_INDEX, nextId: TIMEZONE_NEXT
        })
        components.push(this.back(MAIN_SELECT, paginator.components))
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: PageData = {page, size: pages}
        return this.reply({replyData, data})
    }
}