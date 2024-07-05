import {inlineCode, RepliableInteraction, unorderedList} from 'discord.js'
import {PermissionFlagsBitsKeys} from '../../utils/permission.js'
import {MissingPermissionError} from './index.js'

export class UserMissingPermissionError extends MissingPermissionError {
    readonly name = 'UserMissingPermissionError'
    constructor(interaction: RepliableInteraction, ...permissions: PermissionFlagsBitsKeys[]) {
        let message = interaction.t('error:forbidden:user:missing_permission')
        if (permissions.length) message += '\n' + unorderedList(permissions
            .map(perm => inlineCode(perm)))
        super(message)
    }
}