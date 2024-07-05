import {ChatInputCommandInteraction} from 'discord.js'
import {Command, CommandBuilder} from '../../../../builders/slash.js'
import {Top} from './Top.js'

export const TopSlashCommandBuilder = new CommandBuilder('top')

class TopCommand extends Command {
    chatInputRun = (interaction: ChatInputCommandInteraction) => new Top(interaction).run()
}

export default new TopCommand(TopSlashCommandBuilder)