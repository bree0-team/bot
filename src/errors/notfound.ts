import {RepliableInteraction} from 'discord.js'
import {CustomError} from './general.js'

abstract class NotFoundError extends CustomError {
    public name = 'NotfoundError'
}

export class UnknownMemberError extends NotFoundError {
    readonly name = 'NotfoundError'
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:notfound:unknown_member'))
    }
}

export class UnknownEmojiError extends NotFoundError {
    readonly name = 'UnknownEmojiError'
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:notfound:unknown_emoji'))
    }
}

export class UnknownVoiceError extends NotFoundError {
    readonly name = 'UnknownVoiceError'
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:notfound:unknown_voice'))
    }
}

export class UnknownRoleError extends NotFoundError {
    readonly name = 'UnknownRoleError'
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:notfound:unknown_role'))
    }
}