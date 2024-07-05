import {CommandBuilder} from '../../../../builders/slash.js'
import {SubcommandService} from '../../../../builders/subcommands.js'
import {STATS_COMMAND} from '../enums/StatsCommands.enum.js'

export const StatsSlashCommandBuilder = new CommandBuilder(STATS_COMMAND)
SubcommandService.getCommands(StatsSlashCommandBuilder)