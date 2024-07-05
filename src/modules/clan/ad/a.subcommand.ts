import {Subcommand} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'
import {Ad} from './Ad.js'

export default new Subcommand(ClanSlashCommands.CLAN, Ad, {
    subcommand: ClanSlashCommands.AD
})