import {Subcommand} from '../../../../builders/subcommands.js'
import {ClanSlashCommands} from '../../enums/ClanCommands.enum.js'
import {List} from './List.js'

export default new Subcommand(ClanSlashCommands.CLAN, List, {
    subcommandGroup: ClanSlashCommands.ROLE,
    subcommand: ClanSlashCommands.ROLE_LIST
})