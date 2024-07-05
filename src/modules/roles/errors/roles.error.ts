import {RepliableInteraction} from 'discord.js'
import {CustomError} from '../../../errors/general.js'

abstract class RolesError extends CustomError {}

export class RolesNoAccessError extends RolesError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('roles:error:no_access'))
    }
}