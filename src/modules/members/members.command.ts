import {ChatInputCommandInteraction, PermissionFlagsBits} from 'discord.js'
import {Command, CommandBuilder, CommandRoleOption} from '../../builders/slash.js'
import {Members} from './Members.js'

const MEMBERS: string = 'members'
const slashCommand = new CommandBuilder(MEMBERS)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addRoleOption(new CommandRoleOption({command: MEMBERS, option: 'role', required: true}))

class MembersCommand extends Command {
    chatInputRun = (interaction: ChatInputCommandInteraction) => new Members(interaction).run()
}

export default new MembersCommand(slashCommand)