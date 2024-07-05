import {EmbedBuilder} from 'discord.js'
import {BaseSettings} from '../../structures/BaseSettings.js'

export class BaseSettingsRoles extends BaseSettings {
    embed = (): EmbedBuilder =>
        this.guildEmbed(this.t('settings:settings') + ': ' + this.t('settings:options:roles'))
}