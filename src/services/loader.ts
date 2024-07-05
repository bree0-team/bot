import {CronJob} from 'cron'
import {Client, Collection} from 'discord.js'
import {ICrontabBuilder} from '../builders/crontab.js'
import {ClientEventsValue, IEventBuilder} from '../builders/event.js'
import {CustomId} from '../types/base.type.js'
import {importFilesDefault} from './file.js'
import {InteractionHandler} from '../handlers/interaction.js'
import {Logger, Logs} from './logger.js'
import {Command, CommandName} from '../builders/slash.js'

export class Loader {
    constructor(private client: Client) {}

    /**
     * Загрузить команды
     */
    async loadCommands(): Promise<void> {
        this.client.commands = new Collection<CommandName, Command>()
        await importFilesDefault<Command>('modules', '.command',
            (command, file) => {
            if ('data' in command && 'chatInputRun' in command)
                this.client.commands.set(command.data.name, command)
            else Logger.warn(
                Logs.warn.loaderCommandMissingProperty
                    .replaceAll('{FILE_PATH}', file)
            )
        })
    }

    /**
     * Загрузить ивенты
     */
    loadEvents = (): Promise<void> => importFilesDefault<IEventBuilder>('modules', '.event',
        (event, file) => {
        if (!('process' in event)) Logger.warn(
            Logs.warn.loaderEventMissingProperty
                .replaceAll('{FILE_PATH}', file)
        )
        else {
            if (event.once) this.client.once(event.type, (...args: ClientEventsValue[] | any[]) =>
                event.process(this.client, ...args))
            else this.client.on(event.type, (...args: ClientEventsValue[] | any[]) =>
                event.process(this.client, ...args))
        }
    })

    async loadInteractions(): Promise<void> {
        this.client.interactions = new Collection<CustomId, InteractionHandler>()
        await importFilesDefault<InteractionHandler>('modules', '.interaction',
            (interaction, file) => {
            if ('customId' in interaction)
                if (interaction.customId instanceof Array) for (const customId of interaction.customId)
                    this.client.interactions.set(customId, interaction)
                else this.client.interactions.set(interaction.customId, interaction)
            else Logger.warn(
                Logs.warn.loaderInteractionMissingProperty
                    .replaceAll('{FILE_PATH}', file)
            )
        })
    }
    loadCrontabs = (): Promise<void> => importFilesDefault<ICrontabBuilder>('modules', '.crontab',
        (crontab, file) => CronJob.from({
        cronTime: crontab.time,
        onTick: () => crontab.run(this.client),
        start: true
    }))
}