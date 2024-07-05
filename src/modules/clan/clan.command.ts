import {AutocompleteInteraction, ChatInputCommandInteraction} from 'discord.js'
import {Command} from '../../builders/slash.js'
import {SubcommandService} from '../../builders/subcommands.js'
import {ClanSlashCommandBuilder} from './helpers/slash.js'
import {ClanAutocomplete} from './services/autocomplete.js'

class ClanCommand extends Command {
    autocompleteRun = (interaction: AutocompleteInteraction) => new ClanAutocomplete(interaction).run()
    chatInputRun = (interaction: ChatInputCommandInteraction) => SubcommandService.findOne(interaction)
}

export default new ClanCommand(ClanSlashCommandBuilder)