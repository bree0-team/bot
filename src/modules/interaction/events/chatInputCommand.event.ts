import {ChatInputCommandInteraction, Client} from 'discord.js'
import {catchError} from '../../../errors/general.js'
import {Logger, Logs} from '../../../services/logger.js'
import {Command} from '../../../builders/slash.js'
import {InteractionCreateEventBuilder} from '../../../builders/event.js'
import {setTranslate} from '../helpers/interaction-lang.js'

class ChatInputCommandEvent extends InteractionCreateEventBuilder {
    async process(client: Client, interaction: ChatInputCommandInteraction) {
        if (!interaction.isChatInputCommand()) return;
        setTranslate(interaction)

        const {commandName} = interaction
        const command: Command = client.commands.get(commandName)
        if (!command) return Logger.error(
            Logs.error.commandNotFound
                .replaceAll('{INTERACTION_ID}', interaction.id)
                .replaceAll('{COMMAND_NAME}', commandName)
        )

        try {
            await command.chatInputRun(interaction)
        } catch (error) {
            Logger.error(
                interaction.guildId ?
                    Logs.error.commandGuild
                        .replaceAll('{INTERACTION_ID}', interaction.id)
                        .replaceAll('{COMMAND_NAME}', interaction.commandName)
                        .replaceAll('{USER_TAG}', interaction.user.tag)
                        .replaceAll('{USER_ID}', interaction.user.id)
                        .replaceAll('{CHANNEL_NAME}', interaction.channel.name)
                        .replaceAll('{CHANNEL_ID}', interaction.channelId)
                        .replaceAll('{GUILD_NAME}', interaction.guild.name)
                        .replaceAll('{GUILD_ID}', interaction.guildId) :
                    Logs.error.commandOther
                        .replaceAll('{INTERACTION_ID}', interaction.id)
                        .replaceAll('{COMMAND_NAME}', interaction.commandName)
                        .replaceAll('{USER_TAG}', interaction.user.tag)
                        .replaceAll('{USER_ID}', interaction.user.id),
                error
            )
            return catchError(interaction, error)
        }
    }
}

export default new ChatInputCommandEvent()