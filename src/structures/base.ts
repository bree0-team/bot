import {
    BooleanCache,
    ButtonBuilder,
    CacheType,
    CacheTypeReducer,
    ChannelType,
    Client,
    CommandInteractionOption,
    CommandInteractionOptionResolver,
    Guild,
    GuildBasedChannel,
    GuildMember,
    GuildTextBasedChannel,
    InteractionResponse,
    Message,
    RepliableInteraction,
    Role,
    TextBasedChannel,
    User
} from 'discord.js'
import _ from 'lodash'
import {defaultLocale} from '../helpers/defaults.js'
import LocaleManager from '../modules/locale/managers/locale.manager.js'
import {ITranslate} from '../services/i18n.js'
import {
    ActionButtonRow,
    BackButton,
    ConfirmButton,
    ConfirmOptions,
    DeleteButton,
    EditButton,
    EditResetButtons,
    iFollowUpOptions,
    iReply,
    iReplyOptions,
    PaginatorButtons,
    TurnOnOffButton
} from '../services/interaction.js'
import {ChannelId, CustomId, GuildId, RoleId, UserId} from '../types/base.type.js'

type ReplyOptions = Omit<iReplyOptions, 'interaction'>
type FollowUpOptions = Omit<iFollowUpOptions, 'interaction'>
type iConfirmOptions = Omit<ConfirmOptions, 'interaction'>

export class BaseStructure {
    protected i: RepliableInteraction
    protected t: ITranslate
    protected client: Client<true>
    protected user: User
    protected userId: UserId | undefined
    protected guild: CacheTypeReducer<CacheType, Guild, null>
    protected guildId: CacheTypeReducer<CacheType, GuildId>
    protected channel: CacheTypeReducer<
        'cached' | 'raw',
        GuildTextBasedChannel | null,
        GuildTextBasedChannel | null,
        GuildTextBasedChannel | null,
        TextBasedChannel | null
    >
    protected channelId: ChannelId
    protected message: Message<boolean>
    protected options: Omit<CommandInteractionOptionResolver<CacheType>, 'getMessage' | 'getFocused'>
    protected customId: CustomId

    protected paginator = PaginatorButtons

    constructor(interaction: RepliableInteraction) {
        this.i = interaction
        this.t = interaction.t
        this.client = interaction.client
        this.user = interaction.user
        this.userId = interaction.user?.id
        this.guild = interaction.guild
        this.guildId = interaction.guildId
        this.channel = interaction.channel
        this.channelId = interaction.channelId
        if (interaction.isChatInputCommand()) this.options = interaction.options
        if (interaction.isMessageComponent() || interaction.isModalSubmit()) {
            this.customId = interaction.customId
            this.message = interaction.message
        }
    }

    run(...items: any[]) {}

    protected reply = (
        options: ReplyOptions
    ): Promise<void | Message<BooleanCache<CacheType>> | InteractionResponse<boolean>> =>
        iReply({...options, interaction: this.i})
    protected followUp = (
        options: FollowUpOptions
    ): Promise<void | Message<BooleanCache<CacheType>> | InteractionResponse<boolean>> =>
        this.reply({...options, followUp: true})
    protected back = (backId: string, buttons?: ButtonBuilder[]): ActionButtonRow => BackButton(backId, buttons)
    protected confirm = (options: iConfirmOptions) => ConfirmButton({
        ...options, interaction: this.i
    })
    protected turnOnOff = (customId: CustomId, bool: boolean): ButtonBuilder => TurnOnOffButton(this.i, customId, bool)
    protected editButton = (editId: CustomId): ButtonBuilder => EditButton(this.i, editId)
    protected editReset = (editId: CustomId, resetId: CustomId, bool: boolean): ButtonBuilder[] =>
        EditResetButtons(this.i, editId, resetId, bool)
    protected deleteButton = (deleteId: CustomId): ButtonBuilder => DeleteButton(this.i, deleteId)

    protected getBoolean = (name: string, required: boolean = true): boolean|null =>
        this.options.getBoolean(name, required)
    protected getChannel = <const Type extends ChannelType = ChannelType>(
        name: string,
        required: boolean = true,
        channelTypes?: Type[],
    ): NonNullable<CommandInteractionOption<CacheType>['channel']>|null =>
        this.options.getChannel<Type>(name, required, channelTypes)
    protected getString = (name: string, required: boolean = true): string|null =>
        this.options.getString(name, required)
    protected getInteger = (name: string, required: boolean = true): number|null =>
        this.options.getInteger(name, required)
    protected getNumber = (name: string, required: boolean = true): number|null =>
        this.options.getNumber(name, required)
    protected getUser = (
        name: string,
        required: boolean = true
    ): NonNullable<CommandInteractionOption<CacheType>["user"]>|null => this.options.getUser(name, required)
    protected getMember = (name: string): NonNullable<CommandInteractionOption<CacheType>['member']>|null =>
        this.options.getMember(name)
    protected getMemberOrUser(name: string, required: boolean = true): GuildMember|User|null {
        const member = this.getMember(name)
        const user = this.getUser(name, required)
        return (member instanceof GuildMember) ? member : user
    }
    protected getRole = (
        name: string,
        required: boolean = true
    ): NonNullable<CommandInteractionOption<CacheType>['role']>|null => this.options.getRole(name, required)
    protected getAttachment = (
        name: string,
        required: boolean = true
    ): NonNullable<CommandInteractionOption<CacheType>['attachment']>|null =>
        this.options.getAttachment(name, required)
    protected getMentionable = (
        name: string,
        required: boolean = true
    ): NonNullable<CommandInteractionOption<CacheType>['member' | 'role' | 'user']>|null =>
        this.options.getMentionable(name, required)

    protected getLocaleDate = (date: Date): string => date.toLocaleDateString(
        LocaleManager.getLocale(this.userId) ?? defaultLocale, {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }
    )

    protected getClientUser = (userId: UserId): User | null => this.client.users.resolve(userId)
    protected getGuildChannel = (channelId: ChannelId): GuildBasedChannel | null =>
        this.guild.channels.resolve(channelId)
    protected getGuildRole = (roleId: RoleId): Role | null => this.guild.roles.resolve(roleId)
    protected fetchClientUser = (userId: UserId): Promise<User> => this.client.users.fetch(userId)
    protected fetchGuildMember = async (userId: UserId): Promise<GuildMember> =>
        this.guild.members.fetch(userId)
    protected fetchGuildMemberOrGetUser = async (userId: UserId): Promise<GuildMember | User> =>
        await this.fetchGuildMember(userId) ?? this.getClientUser(userId)
}