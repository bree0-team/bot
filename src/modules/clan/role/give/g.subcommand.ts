import {StringOptionBuilder, Subcommand, UserOptionBuilder} from '../../../../builders/subcommands.js'
import {ClanSlashCommands} from '../../enums/ClanCommands.enum.js'
import {Give} from './Give.js'

export default new Subcommand(ClanSlashCommands.CLAN, Give, {
    subcommandGroup: ClanSlashCommands.ROLE,
    subcommand: ClanSlashCommands.ROLE_GIVE
}, [
    UserOptionBuilder('user', {required: true}),
    StringOptionBuilder('role', {required: true, autocomplete: true})
])