import {ChatInputCommandInteraction} from 'discord.js'
import {Command, CommandBuilder, CommandUserOption} from '../../../../builders/slash.js'
import {Rank} from './Rank.js'

const RANK_COMMAND = 'rank'

export const RankSlashCommandBuilder = new CommandBuilder(RANK_COMMAND)
    .addUserOption(new CommandUserOption({command: RANK_COMMAND, option: 'user'}))

class StatsCommand extends Command {
    chatInputRun = (interaction: ChatInputCommandInteraction) => new Rank(interaction).run()
}

export default new StatsCommand(RankSlashCommandBuilder)