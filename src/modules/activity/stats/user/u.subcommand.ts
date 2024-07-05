import {Subcommand, UserOptionBuilder} from '../../../../builders/subcommands.js'
import {STATS_COMMAND, StatsSubcommands} from '../enums/StatsCommands.enum.js'
import {User} from './User.js'

export default new Subcommand(STATS_COMMAND, User, {
    subcommand: StatsSubcommands.User
}, [
    UserOptionBuilder('user')
])