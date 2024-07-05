import {RepliableInteraction} from 'discord.js'
import {ClanError} from '../../errors/clan.error.js'

class ClanChannelError extends ClanError {}

export class ClanChannelMissingCategoryError extends ClanChannelError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:channel_missing_category'))
    }
}

export class ClanChannelDontHaveError extends ClanChannelError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:dont_have_channels'))
    }
}

export class ClanChannelLimitExceededError extends ClanChannelError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:channel_limit_exceeded'))
    }
}

export class ClanChannelLimitMoreLessError extends ClanChannelError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:members_limit_more_or_less'))
    }
}

export class ClanChannelVoiceError extends ClanChannelError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:you_not_in_clan_voice'))
    }
}

export class ClanChannelVoiceMembersError extends ClanChannelError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:no_one_in_voice'))
    }
}

export class ClanCRAAccessError extends ClanChannelError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:interaction_not_for_you'))
    }
}