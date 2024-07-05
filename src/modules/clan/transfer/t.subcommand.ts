import {Subcommand, UserOptionBuilder} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'
import {Transfer} from './Transfer.js'

export default new Subcommand(ClanSlashCommands.CLAN, Transfer, {
    subcommand: ClanSlashCommands.TRANSFER
}, [
    UserOptionBuilder('user', {required: true})
])