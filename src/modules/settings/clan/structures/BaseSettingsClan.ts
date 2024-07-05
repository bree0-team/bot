import {EmbedBuilder, StringSelectMenuBuilder} from 'discord.js'
import {SelectService} from '../../../../builders/select.js'
import {ActionStringSelectRow, StringSelectRowBuilder} from '../../../../services/interaction.js'
import {BaseSettings} from '../../structures/BaseSettings.js'
import {CLAN_SELECT, SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'

export abstract class BaseSettingsClan extends BaseSettings {
    embed = (): EmbedBuilder =>
        this.guildEmbed(this.t('settings:settings') + ': ' + this.t('settings:options:clan'))
    select(value?: SettingsClanSelectValuesCustomIds): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({customId: CLAN_SELECT})
            .setOptions(SelectService.getOptions(this.i, CLAN_SELECT, value))
        return StringSelectRowBuilder(select)
    }
}