import {EmbedBuilder} from 'discord.js'
import {BaseSettings} from '../../structures/BaseSettings.js'

export class BaseSettingsAfk extends BaseSettings {
    embed = (): EmbedBuilder =>
        this.guildEmbed(this.t('settings:settings') + ': ' + this.t('settings:options:afk'))
}