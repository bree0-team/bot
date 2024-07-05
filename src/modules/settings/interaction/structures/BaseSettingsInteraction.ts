import {EmbedBuilder} from 'discord.js'
import {BaseSettings} from '../../structures/BaseSettings.js'

export abstract class BaseSettingsInteraction extends BaseSettings {
    protected get embed(): EmbedBuilder {
        return this.guildEmbed(this.t('settings:settings') + ': ' + this.t('settings:options:interaction'))
    }
}