import {Client, ClientEvents, Events} from 'discord.js'
import {ValueOf} from '../types/base.type.js'

export type ClientEventsValue = ValueOf<ClientEvents>

export interface IEventBuilder {
    readonly type: keyof ClientEvents
    readonly once?: boolean
    process?(client: Client, ...args: ClientEventsValue[]): void
}

abstract class EventBuilder<Event extends keyof ClientEvents> {
    constructor(public readonly type: Event, public readonly once?: boolean) {}
    public process?(client: Client, ...args: ClientEvents[Event]): void
}

export abstract class ClientReadyEventBuilder extends EventBuilder<Events.ClientReady> {
    constructor(public readonly once?: boolean) {
        super(Events.ClientReady, once)
    }
}

export abstract class MessageCreateEventBuilder extends EventBuilder<Events.MessageCreate> {
    constructor(public readonly once?: boolean) {
        super(Events.MessageCreate, once)
    }
}

export abstract class VoiceStateUpdateEventBuilder extends EventBuilder<Events.VoiceStateUpdate> {
    constructor(public readonly once?: boolean) {
        super(Events.VoiceStateUpdate, once)
    }
}

export abstract class InteractionCreateEventBuilder extends EventBuilder<Events.InteractionCreate> {
    constructor(public readonly once?: boolean) {
        super(Events.InteractionCreate, once)
    }
}