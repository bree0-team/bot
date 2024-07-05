import {RepliableInteraction} from 'discord.js'
import {ClanError} from '../../errors/clan.error.js'

abstract class ClanAdError extends ClanError {}

export class ClanAdChannelNotSetError extends ClanAdError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:ad_channel_not_set'))
    }
}

export class ClanAdCooldownError extends ClanAdError {
    constructor(interaction: RepliableInteraction, time: string) {
        super(interaction.t('clan:error:ad_cooldown', {time}))
    }
}

export class ClanAdDisabledError extends ClanAdError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:ad_disabled'))
    }
}