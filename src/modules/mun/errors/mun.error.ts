import {RepliableInteraction} from 'discord.js'
import {CustomError} from '../../../errors/general.js'

abstract class MunError extends CustomError {}

export class MunAlreadyManagedError extends MunError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('mun:error:already_managed'))
    }
}

export class MunNotInThisChannelError extends MunError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('mun:error:not_in_this_channel'))
    }
}

export class MunYouDontHaveRightsError extends MunError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('mun:error:you_dont_have_rights'))
    }
}

export class MunNoRightsError extends MunError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('mun:error:no_rights'))
    }
}