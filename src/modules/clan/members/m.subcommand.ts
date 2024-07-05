import {StringOptionBuilder, Subcommand} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'
import {Members} from './Members.js'

export default new Subcommand(ClanSlashCommands.CLAN, Members, {
    subcommand: ClanSlashCommands.MEMBERS
}, [
    StringOptionBuilder('clan', {autocomplete: true})
])