import {Subcommand, UserOptionBuilder} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'
import {Invite} from './Invite.js'

export default new Subcommand(ClanSlashCommands.CLAN, Invite, {
    subcommand: ClanSlashCommands.INVITE
}, [
    UserOptionBuilder('user', {required: true})
])