import {EmbedBuilder, StringSelectMenuBuilder} from 'discord.js'
import {SelectService} from '../../../../builders/select.js'
import {ActionStringSelectRow, StringSelectRowBuilder} from '../../../../services/interaction.js'
import {BaseSettings} from '../../structures/BaseSettings.js'
import {XP_SELECT, XpSelectValues} from '../enums/CustomIds.enum.js'

export class BaseSettingsXp extends BaseSettings {
    embed = (): EmbedBuilder =>
        this.guildEmbed(this.t('settings:settings') + ': ' + this.t('settings:options:xp'))
    select(value?: XpSelectValues): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({customId: XP_SELECT})
            .setOptions(...SelectService.getOptions(this.i, XP_SELECT, value))
        return StringSelectRowBuilder(select)
    }
}