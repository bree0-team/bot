import {Subcommand} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'
import {Leave} from './Leave.js'

export default new Subcommand(ClanSlashCommands.CLAN, Leave, {
    subcommand: ClanSlashCommands.LEAVE
})