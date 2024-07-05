import {StringOptionBuilder, Subcommand} from '../../../../builders/subcommands.js'
import {ClanSlashCommands} from '../../enums/ClanCommands.enum.js'
import {Delete} from './Delete.js'

export default new Subcommand(ClanSlashCommands.CLAN, Delete, {
    subcommandGroup: ClanSlashCommands.ROLE,
    subcommand: ClanSlashCommands.ROLE_DELETE
}, [
    StringOptionBuilder('role', {required: true, autocomplete: true})
])