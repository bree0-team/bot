import {ChatInputCommandInteraction, PermissionFlagsBits} from 'discord.js'
import {Command, CommandBuilder} from '../../builders/slash.js'
import {Lock} from './Lock.js'

const slashCommand = new CommandBuilder('lock')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

class LockCommand extends Command {
    chatInputRun = (interaction: ChatInputCommandInteraction) => new Lock(interaction).run()
}

export default new LockCommand(slashCommand)