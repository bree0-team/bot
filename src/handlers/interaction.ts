import {
    AnySelectMenuInteraction,
    ButtonInteraction,
    CollectedInteraction,
    ModalSubmitFields,
    ModalSubmitInteraction
} from 'discord.js'
import {CustomError} from '../errors/general.js'
import InteractionManager from '../modules/interaction/managers/interaction.manager.js'
import SettingsInteractionManager from '../modules/settings/interaction/managers/settings-interaction.manager.js'
import {CustomId} from '../types/base.type.js'
import {InteractionData} from '../types/data.type.js'

export interface ButtonHandlerOptions<Data extends InteractionData = InteractionData> {
    interaction: ButtonInteraction
    data?: Data
}

export interface SelectOneValueHandlerOptions<
    Value extends string = string,
    Data extends InteractionData = InteractionData
> {
    interaction: AnySelectMenuInteraction
    value: Value
    data?: Data
}

export interface SelectManyValuesHandlerOptions<
    Value extends string = string,
    Data extends InteractionData = InteractionData
> {
    interaction: AnySelectMenuInteraction
    values: Value[]
    data?: Data
}

export interface ModalHandlerOptions<Data extends InteractionData = InteractionData> {
    interaction: ModalSubmitInteraction
    fields: ModalSubmitFields
    data?: Data
}

export interface InteractionHandler {
    readonly customId: CustomId | CustomId[]
    process(interaction: CollectedInteraction, data?: InteractionData): void
}

interface InteractionHandlerOptions {
    private?: boolean
    toModal?: boolean
    toDelete?: boolean
}

export abstract class InteractionHandler {
    private readonly private: boolean
    private _toModal: boolean
    private readonly toDelete: boolean
    constructor(
        public readonly customId: CustomId | CustomId[],
        private readonly options?: InteractionHandlerOptions
    ) {
        this.private = options?.private ?? true
        this._toModal = options?.toModal ?? false
        this.toDelete = options?.toDelete ?? false
    }
    get toModal(): boolean {
        return this._toModal
    }
    set toModal(value: boolean) {
        this._toModal = value
    }
    private async check(interaction: CollectedInteraction): Promise<InteractionData> {
        const model = InteractionManager.findOne(interaction.message?.id)
        if (this.private) {
            if (!model) throw new NotAvailableError(interaction)
            if (model.userId !== interaction.user.id) throw new NotForYouError(interaction)
            const {value} = await SettingsInteractionManager.getOne(interaction.guildId)
            if (Date.now() > model.updatedAt.getTime() + value * 1000) throw new TimesUpError(interaction)
        }
        return model?.data || {}
    }
    public async process(interaction: CollectedInteraction): Promise<void> {
        const data = await this.check(interaction)
        await this.$defer(interaction)
        await this.$delete(interaction)
        if (interaction.isButton()) return this.run({interaction, data})
        else if (interaction.isAnySelectMenu()) return this.runValues({
            interaction, data, values: interaction.values
        })
        else if (interaction.isModalSubmit()) return this.runFields({
            interaction, data, fields: interaction.fields
        })
    }
    protected run(options: ButtonHandlerOptions): void {}
    protected runValues(options: SelectManyValuesHandlerOptions): void {
        const {values, ...args} = options
        return this.runValue({...args, value: values && values[0]})
    }
    protected runValue(options: SelectOneValueHandlerOptions): void {}
    protected runFields(options: ModalHandlerOptions): void {}
    private async $defer(interaction: CollectedInteraction): Promise<boolean | void> {
        if (!this._toModal) await interaction.deferUpdate()
    }
    private async $delete(interaction: CollectedInteraction): Promise<boolean | void> {
        if (this.toDelete) {
            await interaction.deleteReply()
            return InteractionManager.remove(interaction.message.id)
        }
    }
}

export abstract class PrivateHandler extends InteractionHandler {
    constructor(public readonly customId: CustomId | CustomId[]) {
        super(customId, {private: true})
    }
}

export abstract class PublicHandler extends InteractionHandler {
    constructor(public readonly customId: CustomId | CustomId[]) {
        super(customId, {private: false})
    }
}

export class DeleteHandler extends InteractionHandler {
    constructor(public readonly customId: CustomId | CustomId[]) {
        super(customId, {toDelete: true})
    }
}

export abstract class ModalHandler extends InteractionHandler {
    constructor(
        public readonly customId: CustomId | CustomId[],
        private readonly isPrivate: boolean = true
    ) {
        super(customId, {toModal: true, private: isPrivate})
    }
}

abstract class InteractionError extends CustomError {}

class NotAvailableError extends InteractionError {
    constructor(interaction: CollectedInteraction) {
        super(interaction.t('interaction:error:not_available'))
    }
}

class NotForYouError extends InteractionError {
    constructor(interaction: CollectedInteraction) {
        super(interaction.t('interaction:error:not_for_you'))
    }
}

class TimesUpError extends InteractionError {
    constructor(interaction: CollectedInteraction) {
        super(interaction.t('interaction:error:times_up'))
    }
}