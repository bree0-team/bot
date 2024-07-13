import {DiscordAPIError} from 'discord.js'
import {Response} from 'node-fetch'
import {createRequire} from 'node:module'
import pino from 'pino'
import pretty from 'pino-pretty'
import {CustomError} from '../errors/general.js'

const require = createRequire(import.meta.url)
const Debug = require('../../config/debug.json')

const stream = pretty({
    colorize: true
})
let logger = pino({
    level: Debug.dummyMode ? 'debug' : 'info'
}, stream)
let sId: number = 0

export class Logger {
    public static trace = (message: string, obj?: any): void => obj ? logger.trace(obj, message) : logger.trace(message)
    public static debug = (message: string, obj?: any): void => obj ? logger.debug(obj, message) : logger.debug(message)
    public static info = (message: string, obj?: any): void => obj ? logger.info(obj, message) : logger.info(message)
    public static warn = (message: string, obj?: any): void => obj ? logger.warn(obj, message) : logger.warn(message)
    public static async error(message: string, obj?: any): Promise<void> {
        // Log just a message if no error object
        if (!obj) return logger.error(message)

        // Otherwise log details about the error
        if (typeof obj === 'string') logger.child({message: obj}).error(message)
        else if (obj instanceof Response) {
            let resText: string;
            try {
                resText = await obj.text();
            } catch {
                // Ignore
            }
            logger.child({
                path: obj.url,
                statusCode: obj.status,
                statusName: obj.statusText,
                headers: obj.headers.raw(),
                body: resText
            }).error(message)
        } else if (obj instanceof DiscordAPIError) logger.child({
            message: obj.message,
            code: obj.code,
            statusCode: obj.status,
            method: obj.method,
            url: obj.url,
            stack: obj.stack
        }).error(message)
        else if (obj instanceof CustomError) logger.child({message: obj.message}).error(message)
        else logger.error(obj, message)
    }
    public static setShardId(shardId: number): void {
        if (sId !== shardId) {
            sId = shardId
            logger = logger.child({shardId: sId})
        }
    }
}

export const Logs = require('../../config/logs.json')