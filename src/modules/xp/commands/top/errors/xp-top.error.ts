import {RepliableInteraction} from 'discord.js'
import {XpError} from '../../../errors/xp.error.js'

abstract class XpTopError extends XpError {}

export class TopNoValuesError extends XpTopError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('top:error:no_values'))
    }
}