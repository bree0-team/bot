import {AutocompleteInteraction, Client} from 'discord.js'
import {Logger, Logs} from '../../../services/logger.js'
import {Command} from '../../../builders/slash.js'
import {InteractionCreateEventBuilder} from '../../../builders/event.js'
import {setTranslate} from '../helpers/interaction-lang.js'

class AutocompleteEvent extends InteractionCreateEventBuilder {
    async process(client: Client, interaction: AutocompleteInteraction) {
        if (!interaction.isAutocomplete()) return;
        setTranslate(interaction)

        const {commandName} = interaction
        const command: Command = client.commands.get(commandName)
        if (!command) return Logger.error(
            Logs.error.commandNotFound
                .replaceAll('{INTERACTION_ID}', interaction.id)
                .replaceAll('{COMMAND_NAME}', commandName)
        )

        if (!('autocompleteRun' in command)) return Logger.error(
            Logs.error.autocompleteNotFound
                .replaceAll('{INTERACTION_ID}', interaction.id)
                .replaceAll('{COMMAND_NAME}', commandName)
        )

        try {
            await command.autocompleteRun(interaction)
        } catch (error) {
            Logger.error(
                interaction.guildId ?
                    Logs.error.autocompleteGuild
                        .replaceAll('{INTERACTION_ID}', interaction.id)
                        .replaceAll('{OPTION_NAME}', commandName)
                        .replaceAll('{COMMAND_NAME}', commandName)
                        .replaceAll('{USER_TAG}', interaction.user.tag)
                        .replaceAll('{USER_ID}', interaction.user.id)
                        .replaceAll('{CHANNEL_NAME}', interaction.channel.name)
                        .replaceAll('{CHANNEL_ID}', interaction.channelId)
                        .replaceAll('{GUILD_NAME}', interaction.guild?.name)
                        .replaceAll('{GUILD_ID}', interaction.guildId) :
                    Logs.error.autocompleteOther
                        .replaceAll('{INTERACTION_ID}', interaction.id)
                        .replaceAll('{OPTION_NAME}', commandName)
                        .replaceAll('{COMMAND_NAME}', commandName)
                        .replaceAll('{USER_TAG}', interaction.user.tag)
                        .replaceAll('{USER_ID}', interaction.user.id),
                error
            )
        }
    }
}

export default new AutocompleteEvent()