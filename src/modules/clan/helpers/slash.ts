import {CommandBuilder} from '../../../builders/slash.js'
import {SubcommandService} from '../../../builders/subcommands.js'
import {ClanSlashCommands} from '../enums/ClanCommands.enum.js'

export const ClanSlashCommandBuilder = new CommandBuilder(ClanSlashCommands.CLAN)
SubcommandService.getCommands(ClanSlashCommandBuilder)