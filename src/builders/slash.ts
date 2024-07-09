import {
    ApplicationCommandOptionAllowedChannelTypes,
    ApplicationCommandOptionType,
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    Locale,
    SharedNameAndDescription,
    SlashCommandAttachmentOption,
    SlashCommandBooleanOption,
    SlashCommandBuilder,
    SlashCommandChannelOption,
    SlashCommandIntegerOption,
    SlashCommandMentionableOption,
    SlashCommandNumberOption,
    SlashCommandOptionsOnlyBuilder,
    SlashCommandRoleOption,
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    SlashCommandUserOption,
} from 'discord.js'
import {readdirSync, readFileSync} from 'fs'
import _ from 'lodash'
import fs from 'node:fs'
import {BotLocale} from '../modules/locale/helpers/consts.js'
import {SplitUtils} from '../utils/split.js'
import {__dirname} from '../services/file.js'

const localePath = `${__dirname}/../locales`

export type CommandName = string
export type SubcommandName = string
export type SubcommandGroupName = string

interface CommandKeysOptions {
    command: CommandName
    subcommandGroup?: SubcommandGroupName
    subcommand?: SubcommandName
}

function getKeys(options: CommandKeysOptions): string[] {
    const {command, subcommandGroup, subcommand} = options
    const keys = [command]
    if (subcommandGroup) keys.push(subcommandGroup)
    if (subcommand) keys.push(subcommand)
    return keys
}

function setLocalizations(self: SharedNameAndDescription, ...keys: string[]): void {
    const names = language.t(...keys, 'name')
    const descriptions = language.t(...keys, 'description')
    if (names['en-US']) self.setName(names['en-US'])
    self.setDescription(descriptions['en-US'] ?? 'Unknown')
    if (names) self.setNameLocalizations(names)
    if (descriptions) self.setDescriptionLocalizations(descriptions)
}

interface BooleanArgs {
    readonly type: ApplicationCommandOptionType.Boolean
    readonly self: SlashCommandBooleanOption,
    readonly options: BooleanOptions
}
interface UserArgs {
    readonly type: ApplicationCommandOptionType.User
    readonly self: SlashCommandUserOption,
    readonly options: UserOptions
}
interface ChannelArgs {
    readonly type: ApplicationCommandOptionType.Channel
    readonly self: SlashCommandChannelOption,
    readonly options: ChannelOptions
}
interface RoleArgs {
    readonly type: ApplicationCommandOptionType.Role
    readonly self: SlashCommandRoleOption,
    readonly options: RoleOptions
}
interface AttachmentArgs {
    readonly type: ApplicationCommandOptionType.Attachment
    readonly self: SlashCommandAttachmentOption,
    readonly options: AttachmentOptions
}
interface MentionableArgs {
    readonly type: ApplicationCommandOptionType.Mentionable
    readonly self: SlashCommandMentionableOption,
    readonly options: MentionableOptions
}
interface StringArgs {
    readonly type: ApplicationCommandOptionType.String
    readonly self: SlashCommandStringOption,
    readonly options: StringOptions
}
interface IntegerArgs {
    readonly type: ApplicationCommandOptionType.Integer
    readonly self: SlashCommandIntegerOption,
    readonly options: IntegerOptions
}
interface NumberArgs {
    readonly type: ApplicationCommandOptionType.Number
    readonly self: SlashCommandNumberOption,
    readonly options: NumberOptions
}
type Args = BooleanArgs |
    UserArgs |
    ChannelArgs |
    RoleArgs |
    AttachmentArgs |
    MentionableArgs |
    StringArgs |
    IntegerArgs |
    NumberArgs
function setOptions(args: Args): void {
    const {type, self, options} = args
    const {command, subcommandGroup, subcommand, option, required} = options
    self.setName(option)
    const keys = getKeys({command, subcommandGroup, subcommand})
    setLocalizations(self, ...keys, 'options', option)
    if (required !== undefined) self.setRequired(required)
    if (type === ApplicationCommandOptionType.Channel) {
        const {channelTypes} = options
        if (channelTypes !== undefined) self.addChannelTypes(...channelTypes)
    } else if (
        type === ApplicationCommandOptionType.String ||
        type === ApplicationCommandOptionType.Integer ||
        type === ApplicationCommandOptionType.Number
    ) {
        const {min, max, choices, autocomplete} = options
        if (type === ApplicationCommandOptionType.String) {
            if (min !== undefined) self.setMaxLength(min)
            if (max !== undefined) self.setMaxLength(max)
            if (choices !== undefined) self.setChoices(...choices
                .map(i => Choice<string>({command, subcommandGroup, subcommand, option, ...i})))
        } else {
            if (min !== undefined) self.setMinValue(min)
            if (max !== undefined) self.setMaxValue(max)
            if (choices !== undefined) self.setChoices(...choices
                .map(i => Choice<number>({command, subcommandGroup, subcommand, option, ...i})))
        }
        if (autocomplete !== undefined) self.setAutocomplete(autocomplete)
    }
}

class SlashBuilder {
    #languages = {}
    constructor() {
        this.loadLanguages()
    }

    get languages() {
        return this.#languages
    }

    get keys() {
        return Object.keys(this.languages)
    }

    loadLanguages() {
        const notLoadLanguage: string[] = Object.values(BotLocale)
        const i18n = readdirSync(localePath)
            .filter(locale => fs.statSync(`${localePath}/${locale}`).isDirectory())
            .filter(locale => !notLoadLanguage.includes(locale))
            .map(locale => {
                const json = readdirSync(`${localePath}/${locale}`)
                    .filter(file => file.endsWith('.slash.json'))
                    .map(file => ({[file.replace('.slash.json', '')]: JSON.parse(
                            readFileSync(`${localePath}/${locale}/${file}`).toString("utf-8")
                        )}))
                return {[locale]: Object.assign({}, ...json)}
            })
        this.#languages = Object.assign({}, ...i18n)
    }

    /**
     * @param keys {string}
     * @return {Record<Locale, string>}
     */
    t(...keys: string[]): Record<Locale, string> {
        const items = this.keys.map(i => ({
            [i]: SplitUtils.findInObject([i, ...keys], this.languages)
        }))
        return _.fromPairs(_.toPairs(_.assign({}, ...items))
            .filter(([_, value]) => value !== undefined))
    }
}

const language = new SlashBuilder()

export type CommandSubcommandsOnlyBuilder = SlashCommandSubcommandsOnlyBuilder
type CommandOptionsOnlyBuilder =
    SlashCommandOptionsOnlyBuilder |
    Omit<CommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
export type CommandOnlyBuilder = CommandSubcommandsOnlyBuilder | CommandOptionsOnlyBuilder

export interface Command {
    readonly data: CommandOnlyBuilder
    autocompleteRun?(interaction: AutocompleteInteraction): void
    chatInputRun?(interaction: ChatInputCommandInteraction): void
}

export abstract class Command {
    constructor(public readonly data: CommandOnlyBuilder) {}
    public autocompleteRun?(interaction: AutocompleteInteraction): void
    public chatInputRun?(interaction: ChatInputCommandInteraction): void
}

export interface SubcommandOptions {
    readonly command: CommandName
    readonly subcommandGroup?: SubcommandGroupName
    readonly subcommand: SubcommandName
}

export interface SubcommandGroupOptions extends Omit<SubcommandOptions, 'subcommand'> {
    readonly subcommandGroup: SubcommandGroupName
}

export interface Option {
    readonly option: string
}

interface RequiredOptions {
    readonly required?: boolean
}

export interface OptionOptions extends Partial<SubcommandOptions>, Option, RequiredOptions {
    readonly subcommand?: SubcommandName
}

interface MinMaxOptions {
    readonly min?: number
    readonly max?: number
}

interface ChoicesAndAutocompleteOptions<ChoiceType extends string|number> {
    readonly choices?: Choice<ChoiceType>[]
    readonly autocomplete?: boolean
}

interface BooleanOptions extends OptionOptions {}
interface UserOptions extends OptionOptions {}
interface ChannelOptions extends OptionOptions {
    readonly channelTypes?: ApplicationCommandOptionAllowedChannelTypes[]
}
interface RoleOptions extends OptionOptions {}
interface AttachmentOptions extends OptionOptions {}
interface MentionableOptions extends OptionOptions {}
interface StringOptions extends OptionOptions, MinMaxOptions, ChoicesAndAutocompleteOptions<string> {}
interface IntegerOptions extends OptionOptions, MinMaxOptions, ChoicesAndAutocompleteOptions<number> {}
interface NumberOptions extends OptionOptions, MinMaxOptions, ChoicesAndAutocompleteOptions<number> {}

export interface Choice<ChoiceType extends string|number> {
    readonly name: string
    readonly value: ChoiceType
}

export interface ChoiceOptions<ChoiceType extends string|number>
    extends Omit<OptionOptions, 'required'>, Partial<Choice<ChoiceType>> {}

interface NameOption {
    readonly name: string
}
interface BaseOption extends NameOption, RequiredOptions {}
export interface BooleanOption extends BaseOption {
    readonly type: ApplicationCommandOptionType.Boolean
}
export interface UserOption extends BaseOption {
    readonly type: ApplicationCommandOptionType.User
}
export interface ChannelOption extends BaseOption {
    readonly type: ApplicationCommandOptionType.Channel
    readonly channelTypes?: ApplicationCommandOptionAllowedChannelTypes[]
}
export interface RoleOption extends BaseOption {
    readonly type: ApplicationCommandOptionType.Role
}
export interface AttachmentOption extends BaseOption {
    readonly type: ApplicationCommandOptionType.Attachment
}
export interface MentionableOption extends BaseOption {
    readonly type: ApplicationCommandOptionType.Mentionable
}
export interface StringOption extends BaseOption, MinMaxOptions, ChoicesAndAutocompleteOptions<string> {
    readonly type: ApplicationCommandOptionType.String
}
export interface IntegerOption extends BaseOption, MinMaxOptions, ChoicesAndAutocompleteOptions<number> {
    readonly type: ApplicationCommandOptionType.Integer
}
export interface NumberOption extends BaseOption, MinMaxOptions, ChoicesAndAutocompleteOptions<number> {
    readonly type: ApplicationCommandOptionType.Number
}

export interface CommandBuilder extends SlashCommandBuilder {}

export class CommandBuilder extends SlashCommandBuilder {
    constructor(name: string) {
        super()
        this.setName(name)
        this.setDescription(name + ' commands')
        this.setDMPermission(false)
        setLocalizations(this, name)
    }
}

export class SubcommandGroupBuilder extends SlashCommandSubcommandGroupBuilder {
    constructor(options: SubcommandGroupOptions) {
        super()
        const {command, subcommandGroup} = options
        this.setName(subcommandGroup)
        this.setDescription(command + ' ' + subcommandGroup + ' commands')
        setLocalizations(this, command, subcommandGroup)
    }
}

export class SubcommandBuilder extends SlashCommandSubcommandBuilder {
    constructor(options: SubcommandOptions) {
        super()
        const {command, subcommandGroup, subcommand} = options
        this.setName(subcommand)
        const keys = getKeys({command, subcommandGroup, subcommand})
        setLocalizations(this, ...keys)
    }
}

export class CommandBooleanOption extends SlashCommandBooleanOption {
    constructor(options: BooleanOptions) {
        super()
        setOptions({type: ApplicationCommandOptionType.Boolean, self: this, options})
    }
}

export class CommandUserOption extends SlashCommandUserOption {
    constructor(options: UserOptions) {
        super()
        setOptions({type: ApplicationCommandOptionType.User, self: this, options})
    }
}

export class CommandChannelOption extends SlashCommandChannelOption {
    constructor(options: ChannelOptions) {
        super()
        setOptions({type: ApplicationCommandOptionType.Channel, self: this, options})
    }
}

export class CommandRoleOption extends SlashCommandRoleOption {
    constructor(options: RoleOptions) {
        super()
        setOptions({type: ApplicationCommandOptionType.Role, self: this, options})
    }
}

export class CommandAttachmentOption extends SlashCommandAttachmentOption {
    constructor(options: AttachmentOptions) {
        super()
        setOptions({type: ApplicationCommandOptionType.Attachment, self: this, options})
    }
}

export class CommandMentionableOption extends SlashCommandMentionableOption {
    constructor(options: MentionableOptions) {
        super()
        setOptions({type: ApplicationCommandOptionType.Mentionable, self: this, options})
    }
}

export class CommandStringOption extends SlashCommandStringOption {
    constructor(options: StringOptions) {
        super()
        setOptions({type: ApplicationCommandOptionType.String, self: this, options})
    }
}

export class CommandIntegerOption extends SlashCommandIntegerOption {
    constructor(options: IntegerOptions) {
        super()
        setOptions({type: ApplicationCommandOptionType.Integer, self: this, options})
    }
}

export class CommandNumberOption extends SlashCommandNumberOption {
    constructor(options: NumberOptions) {
        super()
        setOptions({type: ApplicationCommandOptionType.Number, self: this, options})
    }
}

export type CommandOption =
    CommandBooleanOption |
    CommandUserOption |
    CommandChannelOption |
    CommandRoleOption |
    CommandAttachmentOption |
    CommandMentionableOption |
    CommandStringOption |
    CommandIntegerOption |
    CommandNumberOption

interface ReturnChoice<ChoiceType extends string|number> {
    readonly name: string
    readonly value: ChoiceType
    readonly name_localization?: null | Partial<Record<Locale, null | string>>
}

export const Choice = <ChoiceType extends string|number>(
    options: ChoiceOptions<ChoiceType>
): ReturnChoice<ChoiceType> => {
    const {
        command,
        subcommandGroup,
        subcommand,
        option,
        name,
        value
    } = options
    const keys = getKeys({command, subcommandGroup, subcommand})
    const args = {name, value}
    const names = language.t(...keys, 'options', option, 'choices', name)
    if (names) Object.assign(args, {name_localizations: names})
    return args
}