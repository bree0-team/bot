import {RepliableInteraction} from 'discord.js'
import {CustomError} from './general.js'

abstract class NotFoundError extends CustomError {}

export class UnknownMemberError extends NotFoundError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:notfound:unknown_member'))
    }
}

export class UnknownEmojiError extends NotFoundError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:notfound:unknown_emoji'))
    }
}

export class UnknownVoiceError extends NotFoundError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:notfound:unknown_voice'))
    }
}

export class UnknownRoleError extends NotFoundError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:notfound:unknown_role'))
    }
}

export class UnknownChannelError extends NotFoundError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('error:notfound:unknown_channel'))
    }
}