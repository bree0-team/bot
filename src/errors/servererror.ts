import {RepliableInteraction} from 'discord.js'
import {CustomError} from './general.js'

abstract class ServerError extends CustomError {}

export class ValidUrlError extends ServerError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:servererror:valid_url'))
    }
}