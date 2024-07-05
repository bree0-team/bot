import {Client} from 'discord.js'

export interface ICrontabBuilder {
    readonly time: string
    run(client: Client): void
}

export abstract class CrontabBuilder {
    constructor(public readonly time: string) {}
    abstract run(client: Client): void
}