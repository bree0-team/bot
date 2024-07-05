import {RepliableInteraction} from 'discord.js'
import {CustomError} from './general.js'

abstract class ServerError extends CustomError {
    public name = 'ServerError'
}

export class ValidUrlError extends ServerError {
    readonly name = 'ValidUrlError'
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:forbidden:valid_url'))
    }
}