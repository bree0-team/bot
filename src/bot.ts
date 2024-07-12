import {Client, GatewayIntentBits} from 'discord.js'
import {config} from 'dotenv'
import _ from 'lodash'
import {SyncOptions} from 'sequelize/types/sequelize.js'
import {SubcommandService} from './builders/subcommands.js'
import {delay} from './helpers/delay.js'
import {CommandRegistration, ProcessArgs} from './services/command-registration.js'
import {importModels, sequelize} from './services/database.js'
import {require} from './services/file.js'
import {LocalizationManager} from './services/i18n.js'
import {Loader} from './services/loader.js'
import {Logger, Logs} from './services/logger.js'

config()
const Debug = require('../../config/debug.json')

async function start() {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences
        ],
    })

    await SubcommandService.setAll()
    const loader = new Loader(client)
    await loader.loadCommands()

    const processArgs = _.drop(process.argv, 2) as string[]
    if (_.head(processArgs) as string === 'commands') {
        try {
            await new CommandRegistration(client).run(_.drop(processArgs) as ProcessArgs)
        } catch (error) {
            Logger.error(Logs.error.commandAction, error);
        }
        // Wait for any final logs to be written.
        await delay(1000)
        process.exit()
    }

    sequelize.addModels(await importModels())
    const syncOptions: SyncOptions = {}
    if (Debug.alterTable) Object.assign(syncOptions, {alter: true})
    // todo: reconnect system
    await sequelize.sync(syncOptions)

    await loader.loadEvents()
    await loader.loadInteractions()
    await loader.loadCrontabs()

    client.lang = new LocalizationManager()

    try {
        await client.login(process.env.DISCORD_TOKEN)
    } catch (error) {
        Logger.error(Logs.error.clientLogin, error)
    }
}

process.on('unhandledRejection', (reason, _promise) =>
    Logger.error(Logs.error.unhandledRejection, reason)
)

start().catch(error => console.error(error)/*Logger.error(Logs.error.unspecified, error)*/)