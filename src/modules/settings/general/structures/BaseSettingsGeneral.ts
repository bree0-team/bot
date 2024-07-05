import {EmbedBuilder, StringSelectMenuBuilder} from 'discord.js'
import {SelectService} from '../../../../builders/select.js'
import {ActionStringSelectRow, StringSelectRowBuilder} from '../../../../services/interaction.js'
import {BaseSettings} from '../../structures/BaseSettings.js'
import {GENERAL_SELECT, SettingsGeneralSelectValuesCustomIds} from '../enums/CustomIds.enum.js'

export abstract class BaseSettingsGeneral extends BaseSettings {
    get embed(): EmbedBuilder {
        return this.guildEmbed(this.t('settings:settings') + ': ' + this.t('settings:options:base'))
    }
    select(value?: SettingsGeneralSelectValuesCustomIds): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({customId: GENERAL_SELECT})
            .setOptions(...SelectService.getOptions(this.i, GENERAL_SELECT, value))
        return StringSelectRowBuilder(select)
    }
}