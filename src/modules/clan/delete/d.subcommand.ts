import {Subcommand} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'
import {Delete} from './Delete.js'

export default new Subcommand(ClanSlashCommands.CLAN, Delete, {
    subcommand: ClanSlashCommands.DELETE
})