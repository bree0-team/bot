import {ChatInputCommandInteraction, PermissionFlagsBits} from 'discord.js'
import {Command, CommandBuilder} from '../../builders/slash.js'
import {Settings} from './Settings.js'

const slashCommand = new CommandBuilder('settings')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

class SettingsCommand extends Command {
    chatInputRun = (interaction: ChatInputCommandInteraction) => new Settings(interaction).run()
}

export default new SettingsCommand(slashCommand)