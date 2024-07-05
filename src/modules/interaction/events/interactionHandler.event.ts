import {Client, CollectedInteraction} from 'discord.js'
import {catchError} from '../../../errors/general.js'
import {InteractionHandler} from '../../../handlers/interaction.js'
import {Logger, Logs} from '../../../services/logger.js'
import {InteractionCreateEventBuilder} from '../../../builders/event.js'
import {setTranslate} from '../helpers/interaction-lang.js'

class InteractionHandlerEvent extends InteractionCreateEventBuilder {
    async process(client: Client, interaction: CollectedInteraction) {
        if (
            !interaction.isButton() &&
            !interaction.isAnySelectMenu() &&
            !interaction.isModalSubmit()
        ) return;
        setTranslate(interaction)

        try {
            const handler: InteractionHandler = client.interactions.get(interaction.customId)
            if (!handler) return Logger.error(
                Logs.error.interactionNotFound
                    .replaceAll('{INTERACTION_ID}', interaction.customId)
            )
            await handler.process(interaction)
        } catch (error) {
            /*if (error instanceof CustomError) Logger.trace(
                Logs.error.interaction
                    .replaceAll('{INTERACTION_ID}', interaction.customId),
                error
            )
            else Logger.error(
                Logs.error.interaction
                    .replaceAll('{INTERACTION_ID}', interaction.customId),
                error
            )*/
            console.error(error)
            return catchError(interaction, error)
        }
    }
}

export default new InteractionHandlerEvent()