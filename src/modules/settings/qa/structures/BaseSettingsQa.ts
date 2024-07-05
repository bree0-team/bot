import {ChannelSelectMenuBuilder, ChannelType, EmbedBuilder, StringSelectMenuBuilder} from 'discord.js'
import {SelectService} from '../../../../builders/select.js'
import {DiscordLimits} from '../../../../enums/DiscordLimits.enum.js'
import {
    ActionChannelSelectRow,
    ActionStringSelectRow,
    ChannelSelectRowBuilder,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {ChannelId} from '../../../../types/base.type.js'
import {BaseSettings} from '../../structures/BaseSettings.js'
import {QA_CHANNEL, QA_SELECT, QaSelectValues, QaSelectValuesSorted} from '../enums/CustomIds.enum.js'

export abstract class BaseSettingsQa extends BaseSettings {
    protected get embed(): EmbedBuilder {
        return this.guildEmbed(this.t('settings:settings') + ': ' + this.t('settings:options:qa'))
    }
    protected channelRow(channelId?: ChannelId): ActionChannelSelectRow {
        const select = new ChannelSelectMenuBuilder({
            customId: QA_CHANNEL,
            placeholder: this.t('select:channel'),
            channelTypes: [ChannelType.GuildText],
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN
        })
        if (channelId) select.setDefaultChannels(channelId)
        return ChannelSelectRowBuilder(select)
    }
    protected select(value?: QaSelectValues): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: QA_SELECT,
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN
        }).setOptions(...SelectService.getOptions(this.i, QA_SELECT, value, QaSelectValuesSorted))
        return StringSelectRowBuilder(select)
    }
}