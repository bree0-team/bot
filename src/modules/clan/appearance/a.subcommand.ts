import {Subcommand} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'
import {Appearance} from './Appearance.js'

export default new Subcommand(ClanSlashCommands.CLAN, Appearance, {
    subcommand: ClanSlashCommands.APPEARANCE
})