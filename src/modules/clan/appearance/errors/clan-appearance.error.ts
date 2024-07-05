import {RepliableInteraction} from 'discord.js'
import {ClanError} from '../../errors/clan.error.js'

class ClanAppearanceError extends ClanError {}

export class ClanAppearanceDisabledError extends ClanAppearanceError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:appearance_disabled'))
    }
}