import {
    CollectedInteraction,
    ModalSubmitFields,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle
} from 'discord.js'
import _ from 'lodash'
import {PaginatorMaxPageError} from '../errors/general.js'
import {Modal} from '../services/interaction.js'
import {InteractionData, PageData} from '../types/data.type.js'
import {
    ButtonHandlerOptions,
    InteractionHandler,
    ModalHandlerOptions,
    SelectManyValuesHandlerOptions,
    SelectOneValueHandlerOptions
} from './interaction.js'

const PAGE_CUSTOM_ID: string = 'page'

export interface ButtonPageOptions<Data extends InteractionData = InteractionData> extends ButtonHandlerOptions {
    data: PageData & Data
}
export interface ModalPageOptions<Data extends InteractionData = InteractionData> extends ModalHandlerOptions {
    data: PageData & Data
}
export interface SelectOneValuePageOptions<
    Value extends string = string,
    Data extends InteractionData = InteractionData
> extends SelectOneValueHandlerOptions<Value, PageData & Data> {}
export interface SelectManyValuesPageOptions<
    Value extends string = string,
    Data extends InteractionData = InteractionData
> extends SelectManyValuesHandlerOptions<Value, PageData & Data> {}

export abstract class PaginatorHandler extends InteractionHandler {
    constructor(
        private readonly prevId: string,
        private readonly indexId: string,
        private readonly nextId: string,
        private readonly modalId: string
    ) {
        super([prevId, indexId, nextId, modalId], {toModal: true})
    }
    public async process(interaction: CollectedInteraction): Promise<void> {
        this.toModal = !interaction.isModalSubmit()
        return super.process(interaction)
    }
    protected async run(options: ButtonPageOptions): Promise<void> {
        const {interaction} = options
        if ([this.prevId, this.nextId].includes(interaction.customId)) {
            await interaction.deferUpdate()
            if (interaction.customId === this.prevId) return this.runPrev(options)
            else if (interaction.customId === this.nextId) return this.runNext(options)
        } else if (interaction.customId === this.indexId) return this.runModal(options)
    }
    protected runFields(options: ModalPageOptions): void {}
    protected runPrev(options: ButtonPageOptions): void {}
    protected runNext(options: ButtonPageOptions): void {}
    protected runModal(options: ButtonPageOptions): Promise<void> {
        const {interaction, data} = options
        const {page, size} = data
        return Modal(interaction, this.modalId,
            interaction.t('common:paginator:jump'), [
                new TextInputBuilder({
                    customId: PAGE_CUSTOM_ID,
                    label: interaction.t('common:paginator:page', {max: size}),
                    value: (page + 1).toString(),
                    style: TextInputStyle.Short,
                    minLength: 1, maxLength: size.toString().length
                })
            ]
        )
    }
    protected prev = (page: number, size: number): number => page > 0 ? --page : size - 1
    protected next = (page: number, size: number): number => page + 1 < size ? ++page : 0
    protected getPage(interaction: ModalSubmitInteraction, fields: ModalSubmitFields, size: number): number {
        const value = fields.getTextInputValue(PAGE_CUSTOM_ID)
        const page = _.toLength(value) as number
        const finalPage = page - 1
        if (finalPage > size) throw new PaginatorMaxPageError(interaction)
        return finalPage
    }
}