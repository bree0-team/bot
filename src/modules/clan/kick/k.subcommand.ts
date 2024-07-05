import {Subcommand, UserOptionBuilder} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'
import {Kick} from './Kick.js'

export default new Subcommand(ClanSlashCommands.CLAN, Kick, {
    subcommand: ClanSlashCommands.KICK
}, [
    UserOptionBuilder('user', {required: true})
])