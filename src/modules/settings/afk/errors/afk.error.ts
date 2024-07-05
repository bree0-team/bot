import {RepliableInteraction} from 'discord.js'
import {SettingsError} from '../../errors/settings.error.js'
import {defaultMaxSleep, defaultMinSleep} from '../constants/defaults.js'

class AfkError extends SettingsError {}

export class AfkSleepMinMaxError extends AfkError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('settings:error:afk_min_max', {min: defaultMinSleep, max: defaultMaxSleep}))
    }
}