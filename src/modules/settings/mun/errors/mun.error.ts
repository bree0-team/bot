import {RepliableInteraction} from 'discord.js'
import {SettingsError} from '../../errors/settings.error.js'

abstract class SettingsMunError extends SettingsError {}

export class SettingsMunMissingChannelError extends SettingsMunError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('settings:error:mun_missing_channel'))
    }
}