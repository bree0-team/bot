import {StringOptionBuilder, Subcommand} from '../../../../builders/subcommands.js'
import {ClanSlashCommands} from '../../enums/ClanCommands.enum.js'
import {Rename} from './Rename.js'

export default new Subcommand(ClanSlashCommands.CLAN, Rename, {
    subcommandGroup: ClanSlashCommands.ROLE,
    subcommand: ClanSlashCommands.ROLE_RENAME
}, [
    StringOptionBuilder('role', {required: true, autocomplete: true}),
    StringOptionBuilder('name', {required: true, min: 1, max: 100}),
])