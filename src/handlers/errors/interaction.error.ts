import {RepliableInteraction} from 'discord.js'
import {CustomError} from '../../errors/general.js'

abstract class InteractionError extends CustomError {}

export class PaginatorMaxPageError extends InteractionError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('common:error:paginator_max_page'))
    }
}

export class InteractionRateLimitError extends InteractionError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:rate_limit:interactions'))
    }
}