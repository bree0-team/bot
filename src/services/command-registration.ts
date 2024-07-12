import {
    APIApplicationCommand,
    Client,
    REST,
    RESTGetAPIApplicationCommandsResult,
    RESTPatchAPIApplicationCommandJSONBody,
    RESTPostAPIApplicationCommandsResult,
    Routes,
} from 'discord.js'
import {Logger, Logs} from './logger.js'
import {CommandName, CommandOnlyBuilder} from '../builders/slash.js'

export type ProcessArgs = [string, CommandName, CommandName]

export class CommandRegistration {
    private rest: REST = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)
    private clientId = process.env.DISCORD_CLIENT_ID
    private localCommands: CommandOnlyBuilder[]
    private remoteCommands: APIApplicationCommand[]
    private localCommandsOnRemote: CommandOnlyBuilder[]
    private localCommandsOnly: CommandOnlyBuilder[]
    private remoteCommandsOnly: APIApplicationCommand[]
    constructor(private client: Client) {}
    async run(args: ProcessArgs) {
        const [switched, commandName, newCommandName] = args
        this.localCommands = this.client.commands.map(i => i.data)
        this.remoteCommands = await this.rest.get(
            Routes.applicationCommands(this.clientId)
        ) as RESTGetAPIApplicationCommandsResult

        this.localCommandsOnRemote = this.localCommands.filter(
            localCommand => this.remoteCommands.some(
                remoteCommand=> remoteCommand.name === localCommand.name
            )
        )
        this.localCommandsOnly = this.localCommands.filter(
            localCommand => !this.remoteCommands.some(
                remoteCommand=> remoteCommand.name === localCommand.name
            )
        )
        this.remoteCommandsOnly = this.remoteCommands.filter(
            remoteCommand => !this.localCommands.some(
                localCommand => localCommand.name === remoteCommand.name
            )
        )

        switch (switched) {
            case 'view': return this.view()
            case 'register': return this.register()
            case 'rename': return this.rename(commandName, newCommandName)
            case 'delete': return this.delete(commandName)
            case 'clear': return this.clear()
        }
    }
    view() {
        Logger.info(
            Logs.info.commandActionView
                .replaceAll('{LOCAL_ON_REMOTE}', this.formatCommandList(this.localCommandsOnRemote))
                .replaceAll('{LOCAL}', this.formatCommandList(this.localCommandsOnly))
                .replaceAll('{REMOTE}', this.formatCommandList(this.remoteCommandsOnly))
        )
    }
    async register() {
        if (this.localCommandsOnly.length > 0) {
            Logger.info(
                Logs.info.commandActionRegisterStart
                    .replaceAll('{COMMAND_SIZE}', this.localCommandsOnly.length)
                    .replaceAll('{COMMAND_LIST}', this.formatCommandList(this.localCommandsOnly))
            )
            const allData: APIApplicationCommand[] = []
            for (const localCommand of this.localCommandsOnly) {
                const data = await this.rest.post(Routes.applicationCommands(this.clientId),
                    {body: localCommand}
                ) as RESTPostAPIApplicationCommandsResult
                allData.push(data)
            }
            Logger.info(
                Logs.info.commandActionRegisterEnd
                    .replaceAll('{COMMAND_SIZE}', allData.length)
                    .replaceAll('{COMMAND_LIST}', this.formatCommandList(this.localCommandsOnly))
            )
        }

        if (this.localCommandsOnRemote.length > 0) {
            Logger.info(
                Logs.info.commandActionRefreshStart
                    .replaceAll('{COMMAND_SIZE}', this.localCommandsOnRemote.length)
                    .replaceAll('{COMMAND_LIST}', this.formatCommandList(this.localCommandsOnRemote))
            )
            const allData: APIApplicationCommand[] = []
            for (const localCommand of this.localCommandsOnRemote) {
                const data = await this.rest.post(Routes.applicationCommands(this.clientId),
                    {body: localCommand}
                ) as RESTPostAPIApplicationCommandsResult
                allData.push(data)
            }
            Logger.info(
                Logs.info.commandActionRefreshEnd
                    .replaceAll('{COMMAND_SIZE}', allData.length)
                    .replaceAll('{COMMAND_LIST}', this.formatCommandList(this.localCommandsOnRemote))
            )
        }
    }
    async rename(name: CommandName, newName: CommandName) {
        if (!(name && newName)) return Logger.error(Logs.error.commandActionRenameMissingArg)

        const remoteCommand = this.remoteCommands.find(remoteCommand =>
            remoteCommand.name == name)
        if (!remoteCommand) return Logger.error(
            Logs.error.commandActionNotFound
                .replaceAll('{COMMAND_NAME}', name)
        )

        Logger.info(
            Logs.info.commandActionRenameStart
                .replaceAll('{OLD_COMMAND_NAME}', name)
                .replaceAll('{NEW_COMMAND_NAME}', newName)
        )
        const body: RESTPatchAPIApplicationCommandJSONBody = {
            name: newName,
        }
        await this.rest.patch(Routes.applicationCommand(this.clientId, remoteCommand.id), {
            body,
        })
        Logger.info(Logs.info.commandActionRenameEnd);
    }
    async delete(name: CommandName) {
        if (!name) return Logger.error(Logs.error.commandActionDeleteMissingArg)

        let remoteCommand = this.remoteCommands.find(remoteCommand =>
            remoteCommand.name == name)
        if (!remoteCommand) return Logger.error(
            Logs.error.commandActionNotFound
                .replaceAll('{COMMAND_NAME}', name)
        )

        Logger.info(
            Logs.info.commandActionDeleteStart
                .replaceAll('{COMMAND_NAME}', remoteCommand.name)
        )
        await this.rest.delete(Routes.applicationCommand(this.clientId, remoteCommand.id));
        Logger.info(
            Logs.info.commandActionDeleteEnd
                .replaceAll('{COMMAND_NAME}', remoteCommand.name)
        )
    }
    async clear() {
        Logger.info(
            Logs.info.commandActionClearStart
                .replaceAll('{COMMAND_SIZE}', this.client.commands.size)
        )
        await this.rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: [] })
        Logger.info(Logs.info.commandActionClearEnd)
    }
    private formatCommandList = (commands: CommandOnlyBuilder[] | APIApplicationCommand[]): string =>
        commands.length > 0 ? commands.map(command => command.name).join(', ') : 'N/A'
}