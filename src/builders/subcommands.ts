import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    Collection,
    SlashCommandSubcommandGroupBuilder,
} from 'discord.js'
import {BaseStructure} from '../structures/base.js'
import {importFilesDefault} from '../services/file.js'
import {
    AttachmentOption,
    BooleanOption,
    ChannelOption,
    CommandAttachmentOption,
    CommandBooleanOption,
    CommandBuilder,
    CommandChannelOption,
    CommandIntegerOption,
    CommandMentionableOption,
    CommandName,
    CommandNumberOption,
    CommandOption,
    CommandRoleOption,
    CommandStringOption,
    CommandSubcommandsOnlyBuilder,
    CommandUserOption,
    IntegerOption,
    MentionableOption,
    NumberOption,
    OptionOptions,
    RoleOption,
    StringOption,
    SubcommandBuilder,
    SubcommandGroupBuilder,
    SubcommandGroupName,
    SubcommandName,
    SubcommandOptions,
    UserOption,
} from './slash.js'

const collection = new Collection<CommandName, SubcommandsExecutes>()
type SubcommandsExecutes = Record<
    SubcommandGroupName | SubcommandName,
    Subcommand | Record<SubcommandName, Subcommand>
>

type OptionType =
    BooleanOption |
    UserOption |
    ChannelOption |
    RoleOption |
    AttachmentOption |
    MentionableOption |
    StringOption |
    IntegerOption |
    NumberOption

export class Subcommand {
    readonly subcommandGroup: SubcommandGroupName
    readonly subcommand: SubcommandName
    constructor(
        readonly command: CommandName,
        readonly execute: typeof BaseStructure,
        private readonly options: Omit<SubcommandOptions, 'command'>,
        readonly subcommandOptions: OptionType[] = []
    ) {
        this.subcommandGroup = options.subcommandGroup
        this.subcommand = options.subcommand
    }
}

export const BooleanOptionBuilder = (name: string, options?: Omit<BooleanOption, 'type' | 'name'>): BooleanOption => ({
    type: ApplicationCommandOptionType.Boolean, name, ...options
})
export const UserOptionBuilder = (name: string, options?: Omit<UserOption, 'type' | 'name'>): UserOption => ({
    type: ApplicationCommandOptionType.User, name, ...options
})
export const ChannelOptionBuilder = (name: string, options?: Omit<ChannelOption, 'type' | 'name'>): ChannelOption => ({
    type: ApplicationCommandOptionType.Channel, name, ...options
})
export const RoleOptionBuilder = (name: string, options?: Omit<RoleOption, 'type' | 'name'>): RoleOption => ({
    type: ApplicationCommandOptionType.Role, name, ...options
})
export const AttachmentOptionBuilder = (
    name: string,
    options?: Omit<AttachmentOption, 'type' | 'name'>
): AttachmentOption => ({
    type: ApplicationCommandOptionType.Attachment, name, ...options
})
export const MentionableOptionBuilder = (
    name: string,
    options?: Omit<MentionableOption, 'type' | 'name'>
): MentionableOption => ({
    type: ApplicationCommandOptionType.Mentionable, name, ...options
})
export const StringOptionBuilder = (name: string, options?: Omit<StringOption, 'type' | 'name'>): StringOption => ({
    type: ApplicationCommandOptionType.String, name, ...options
})
export const IntegerOptionBuilder = (name: string, options?: Omit<IntegerOption, 'type' | 'name'>): IntegerOption => ({
    type: ApplicationCommandOptionType.Integer, name, ...options
})
export const NumberOptionBuilder = (name: string, options?: Omit<NumberOption, 'type' | 'name'>): NumberOption => ({
    type: ApplicationCommandOptionType.Number, name, ...options
})

function arrayOptions(subcommand: Subcommand): CommandOption[] {
    return subcommand.subcommandOptions.map(option => {
        const {type, name,  required} = option
        const namedOptions: OptionOptions = {
            command: subcommand.command,
            subcommandGroup: subcommand.subcommandGroup,
            subcommand: subcommand.subcommand,
            option: name,
            required
        }
        if (type === ApplicationCommandOptionType.Boolean)
            return new CommandBooleanOption({...namedOptions})
        else if (type === ApplicationCommandOptionType.User)
            return new CommandUserOption({...namedOptions})
        else if (type === ApplicationCommandOptionType.Channel) {
            const {channelTypes} = option
            return new CommandChannelOption({...namedOptions, channelTypes})
        }
        else if (type === ApplicationCommandOptionType.Role)
            return new CommandRoleOption({...namedOptions})
        else if (type === ApplicationCommandOptionType.Attachment)
            return new CommandAttachmentOption({...namedOptions})
        else if (type === ApplicationCommandOptionType.Mentionable)
            return new CommandMentionableOption({...namedOptions})
        else if (
            type === ApplicationCommandOptionType.String ||
            type === ApplicationCommandOptionType.Integer ||
            type === ApplicationCommandOptionType.Number
        ) {
            const {
                min,
                max,
                autocomplete
            } = option
            if (type === ApplicationCommandOptionType.String) {
                const {choices} = option
                return new CommandStringOption({...namedOptions, min, max, choices, autocomplete})
            } else {
                const {choices} = option
                if (type === ApplicationCommandOptionType.Integer)
                    return new CommandIntegerOption({
                        ...namedOptions, min, max, choices, autocomplete
                    })
                else
                    return new CommandNumberOption({
                        ...namedOptions, min, max, choices, autocomplete
                    })
            }
        }
    })
}
function addSubcommandOptions(subcommand: SubcommandBuilder, execute: Subcommand): SubcommandBuilder {
    arrayOptions(execute).map(i => {
        const {type} = i
        if (type === ApplicationCommandOptionType.Boolean) subcommand.addBooleanOption(i)
        else if (type === ApplicationCommandOptionType.User) subcommand.addUserOption(i)
        else if (type === ApplicationCommandOptionType.Channel) subcommand.addChannelOption(i)
        else if (type === ApplicationCommandOptionType.Role) subcommand.addRoleOption(i)
        else if (type === ApplicationCommandOptionType.Attachment) subcommand.addAttachmentOption(i)
        else if (type === ApplicationCommandOptionType.Mentionable) subcommand.addMentionableOption(i)
        else if (type === ApplicationCommandOptionType.String) subcommand.addStringOption(i)
        else if (type === ApplicationCommandOptionType.Integer) subcommand.addIntegerOption(i)
        else if (type === ApplicationCommandOptionType.Number) subcommand.addNumberOption(i)
    })
    return subcommand
}
function addSubcommand(
    builder: CommandBuilder | SubcommandGroupBuilder,
    execute: Subcommand
): CommandSubcommandsOnlyBuilder | SlashCommandSubcommandGroupBuilder {
    const {command, subcommandGroup, subcommand} = execute
    return builder.addSubcommand(addSubcommandOptions(new SubcommandBuilder({
        command, subcommandGroup, subcommand
    }), execute))
}
function addSubcommands(command: CommandBuilder, executes: SubcommandsExecutes): CommandSubcommandsOnlyBuilder {
    Object.entries(executes).map(([subOrGroupName, subOrGroup]) => {
        if (subOrGroup instanceof Subcommand) addSubcommand(command, subOrGroup)
        else {
            const subcommandGroup = new SubcommandGroupBuilder({
                command: command.name,
                subcommandGroup: subOrGroupName,
            })
            Object.values(subOrGroup).map(subcommand => addSubcommand(subcommandGroup, subcommand))
            command.addSubcommandGroup(subcommandGroup)
        }
    })
    return command
}

export class SubcommandService {
    static setAll = async (): Promise<void> =>
        importFilesDefault<Subcommand>('modules', '.subcommand',
            (subcommand) => SubcommandService.set(subcommand))
    static set(subcommand: Subcommand):  Collection<CommandName, SubcommandsExecutes> {
        const subGet = collection.get(subcommand.command) || {}
        if (subcommand.subcommandGroup) {
            if (!(subcommand.subcommandGroup in subGet))
                Object.assign(subGet, {[subcommand.subcommandGroup]: {}})
            subGet[subcommand.subcommandGroup][subcommand.subcommand] = subcommand
        }
        else Object.assign(subGet, {[subcommand.subcommand]: subcommand})
        return collection.set(subcommand.command, subGet)
    }
    static findOne(interaction: ChatInputCommandInteraction): void {
        const subcommandGroup = interaction.options.getSubcommandGroup()
        const subcommand = interaction.options.getSubcommand()
        let options = collection.get(interaction.commandName)
        let command: Subcommand;
        if (subcommandGroup && subcommandGroup in options) command = options[subcommandGroup][subcommand]
        else if (subcommand in options) command = options[subcommand] as Subcommand
        if (command) {
            const {execute} = command
            return new execute(interaction).run()
        }
    }
    static getCommands = (command: CommandBuilder): CommandSubcommandsOnlyBuilder =>
        addSubcommands(command, collection.get(command.name))
}