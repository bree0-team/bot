import {ChatInputCommandInteraction, PermissionFlagsBits} from 'discord.js'
import {Command, CommandBuilder, CommandUserOption} from '../../builders/slash.js'
import {Roles} from './Roles.js'

const ROLES_COMMAND: string = 'roles'
const slashCommand = new CommandBuilder(ROLES_COMMAND)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption(new CommandUserOption({command: ROLES_COMMAND, option: 'user', required: true}))

class RolesCommand extends Command {
    chatInputRun = (interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getUser('user')
        return new Roles(interaction).run(user.id)
    }
}

export default new RolesCommand(slashCommand)