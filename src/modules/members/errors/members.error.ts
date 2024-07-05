import {RepliableInteraction} from 'discord.js'
import {CustomError} from '../../../errors/general.js'

abstract class MembersError extends CustomError {}

export class MembersEveryoneError extends MembersError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('members:error:everyone'))
    }
}