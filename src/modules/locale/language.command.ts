import {ChatInputCommandInteraction} from 'discord.js'
import {Command, CommandBuilder} from '../../builders/slash.js'
import {Language} from './Language.js'

const slashCommand = new CommandBuilder('language')

class LocaleCommand extends Command {
    chatInputRun = (interaction: ChatInputCommandInteraction) => new Language(interaction).run()
}

export default new LocaleCommand(slashCommand)