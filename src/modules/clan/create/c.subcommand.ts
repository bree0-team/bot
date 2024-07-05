import {StringOptionBuilder, Subcommand} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'
import {Create} from './Create.js'

export default new Subcommand(ClanSlashCommands.CLAN, Create, {
    subcommand: ClanSlashCommands.CREATE
}, [
    StringOptionBuilder('emoji', {required: true, autocomplete: true}),
    StringOptionBuilder('name', {required: true}),
])