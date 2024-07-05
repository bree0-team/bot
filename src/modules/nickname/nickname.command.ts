import {ChatInputCommandInteraction, PermissionFlagsBits} from 'discord.js'
import {
    Command,
    CommandBuilder,
    CommandStringOption,
    CommandUserOption,
} from '../../builders/slash.js'
import {Nickname} from './Nickname.js'

const NICKNAME: string = 'nickname'
const nicknameOptions = {command: NICKNAME}

const slashCommand = new CommandBuilder(NICKNAME)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
    .addUserOption(new CommandUserOption({...nicknameOptions, option: 'user', required: true}))
    .addStringOption(new CommandStringOption({...nicknameOptions, option: 'nick', min: 1, max: 32}))

class NicknameCommand extends Command {
    chatInputRun = (interaction: ChatInputCommandInteraction) => new Nickname(interaction).run()
}

export default new NicknameCommand(slashCommand)