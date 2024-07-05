import {RepliableInteraction} from 'discord.js'
import {CustomError} from '../../../errors/general.js'

export abstract class SettingsError extends CustomError {}

export class SettingsMinCooldownError extends SettingsError {
    constructor(interaction: RepliableInteraction, cooldown: number) {
        super(interaction.t('settings:error:min_cooldown', {cooldown}))
    }
}