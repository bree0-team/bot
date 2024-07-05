import {RepliableInteraction} from 'discord.js'
import {CustomError} from '../../../errors/general.js'

abstract class QaError extends CustomError {}

export class QaUserDontHaveRightsToModifyError extends QaError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('qa:error:user_no_rights'))
    }
}

export class QaNotInThisChannelError extends QaError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('qa:error:not_in_this_channel'))
    }
}

export class QaYouDontHaveRightsError extends QaError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('qa:error:you_dont_have_rights'))
    }
}

export class QaAlreadyResolvedError extends QaError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('qa:error:already_resolved'))
    }
}