import {StringOptionBuilder, Subcommand} from '../../../../builders/subcommands.js'
import {ClanSlashCommands} from '../../enums/ClanCommands.enum.js'
import {New} from './New.js'

export default new Subcommand(ClanSlashCommands.CLAN, New, {
    subcommandGroup: ClanSlashCommands.ROLE,
    subcommand: ClanSlashCommands.ROLE_NEW
}, [
    StringOptionBuilder('name', {required: true, min: 1, max: 100})
])