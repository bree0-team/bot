import {StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'
import {DiscordStatuses} from '../../../../enums/DiscordStatuses.enum.js'
import {ActionStringSelectRow, StringSelectRowBuilder} from '../../../../services/interaction.js'
import {BannerMembersWithStatusType} from '../types/banner.type.js'
import {BaseSettingsBanner} from './BaseSettingsBanner.js'

export abstract class BaseSettingsBannerStatus extends BaseSettingsBanner {
    protected statusesRow(customId: string, statuses: BannerMembersWithStatusType[]): ActionStringSelectRow {
        const values = Object.values(BannerMembersWithStatusType)
        const select = new StringSelectMenuBuilder({
            customId, minValues: 1, maxValues: values.length
        }).setOptions(values.map(i => new StringSelectMenuOptionBuilder({
            emoji: DiscordStatuses[i],
            label: this.t('statuses:' + i),
            value: i,
            default: statuses.includes(i)
        })))
        return StringSelectRowBuilder(select)
    }
}