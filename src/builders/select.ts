import {
    AnySelectMenuInteraction,
    Collection,
    ComponentEmojiResolvable,
    RepliableInteraction,
    SelectMenuComponentOptionData,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import {importFilesDefault} from '../services/file.js'
import {BaseStructure} from '../structures/base.js'
import {CustomId} from '../types/base.type.js'

const collection = new Collection<CustomId, SelectOptions>()
type SelectOptions = Record<string, SelectBuilder>

export class SelectBuilder {
    readonly emoji: ComponentEmojiResolvable
    readonly label: string
    readonly value: string
    readonly description: string
    constructor(
        readonly customId: CustomId,
        readonly option: typeof BaseStructure,
        private readonly options: SelectMenuComponentOptionData
    ) {
        this.emoji = options.emoji
        this.label = options.label
        this.value = options.value
        this.description = options.description
    }
    getOption(interaction: RepliableInteraction, value?: string): StringSelectMenuOptionBuilder {
        if (!this.label)
            throw new Error(`Не задан label для "${value}" в select "${this.customId}" и вызывается getOption`)
        return new StringSelectMenuOptionBuilder({
            emoji: this.emoji,
            label: interaction.t(this.label),
            value: this.value,
            description: this.description,
            default: this.value === value
        })
    }
}

export class SelectService {
    static setAll = async (): Promise<void> =>
        importFilesDefault<SelectBuilder>('modules', '.option', (option) =>
            SelectService.set(option))
    static set(option: SelectBuilder): Collection<CustomId, SelectOptions> {
        const optGet = collection.get(option.customId) || {}
        Object.assign(optGet, {[option.value]: option})
        return collection.set(option.customId, optGet)
    }
    static findOne(interaction: AnySelectMenuInteraction, value: string, ...args: any[]): void {
        const options = collection.get(interaction.customId)
        if (value in options) {
            const {option} = options[value]
            return new option(interaction).run(...args)
        }
    }
    static getOptions(
        interaction: RepliableInteraction,
        customId: CustomId,
        value?: string,
        sortedValues?: Array<string>
    ): StringSelectMenuOptionBuilder[] {
        const options = collection.get(customId)
        const values = Object.values(options)
        if (sortedValues) {
            const sorted: Record<string, number> = sortedValues
                .map((i, index) => ({[i]: index}))
                .reduce((acc, item) => ({...acc, ...item}), {})
            values.sort((a, b) => sorted[a.value] - sorted[b.value])
        }
        return values.map(item => item.getOption(interaction, value))
    }
}