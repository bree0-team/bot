import {RepliableInteraction} from 'discord.js'
import {CustomError} from '../../../errors/general.js'
import {EmbedField} from '../../../helpers/embed.js'

export abstract class ClanError extends CustomError {}

export class ClansNotExistsError extends ClanError {
    constructor(interaction: RepliableInteraction, guild_name: string) {
        super(interaction.t('clan:error:not_exists', {guild_name}))
    }
}

export class ClanNotExistError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:not_exist'))
    }
}

export class ClanYouExistError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:you_exist'))
    }
}

export class ClanMemberExistError extends ClanError {
    constructor(interaction: RepliableInteraction, user: string) {
        super(interaction.t('clan:error:member_exist', {user}))
    }
}

export class ClanYouNotExistError extends ClanError {
    constructor(interaction: RepliableInteraction, ...fields: EmbedField[]) {
        super(interaction.t('clan:error:you_not_exist'), ...fields)
    }
}

export class ClanMemberNotExistError extends ClanError {
    constructor(interaction: RepliableInteraction, user: string) {
        super(interaction.t('clan:error:member_not_exist', {user}))
    }
}

export class ClanCommandForRankError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:cmd_for_rank'))
    }
}

export class ClanOwnerLeaveError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:owner_leave'))
    }
}

export class ClanKickYourselfError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:kick_yourself'))
    }
}

export class ClanKickSameRankError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:kick_same_rank'))
    }
}

export class ClanChangeSameRankError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:change_same_rank'))
    }
}

export class ClanRankYourselfError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:rank_yourself'))
    }
}

export class ClanSameRankError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:same_rank'))
    }
}

export class ClanRoleNotExistError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:role_not_exist'))
    }
}

export class ClanDeleteSystemRoleError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:delete_system_role'))
    }
}

export class ClanTransferYourselfError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:transfer_yourself'))
    }
}

export class ClanTransferDisabledError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:transfer_disabled'))
    }
}

export class ClanInviteLimitError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:invite_limit'))
    }
}

export class ClanRoleToCreateError extends ClanError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('clan:error:you_dont_have_role_to_create'))
    }
}