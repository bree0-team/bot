import {ChatInputCommandInteraction} from 'discord.js'
import {Command} from '../../../builders/slash.js'
import {SubcommandService} from '../../../builders/subcommands.js'
import {StatsSlashCommandBuilder} from './helpers/slash.js'

class StatsCommand extends Command {
    chatInputRun = (interaction: ChatInputCommandInteraction) => SubcommandService.findOne(interaction)
}

export default new StatsCommand(StatsSlashCommandBuilder)