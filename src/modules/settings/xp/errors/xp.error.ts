import {RepliableInteraction} from 'discord.js'
import {SettingsError} from '../../errors/settings.error.js'

abstract class XpError extends SettingsError {}

export class XpGiveLessZeroError extends XpError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('settings:error:xp_give_less_zero'))
    }
}

export class XpGiveFromToError extends XpError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('settings:error:xp_give_from_to'))
    }
}