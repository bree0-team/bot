import {
    ActionRowBuilder,
    AnyComponentBuilder,
    AnySelectMenuInteraction,
    APIActionRowComponent,
    APIMessageActionRowComponent,
    AutocompleteInteraction,
    BooleanCache,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    CacheType,
    ChannelSelectMenuBuilder,
    Client,
    EmbedBuilder,
    InteractionReplyOptions,
    InteractionResponse,
    JSONEncodable,
    Message,
    MessageReplyOptions,
    ModalActionRowComponentBuilder,
    ModalBuilder,
    RepliableInteraction,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    TextInputBuilder,
    User,
    UserSelectMenuBuilder
} from 'discord.js'
import {DiscordLimits} from '../enums/DiscordLimits.enum.js'
import {TickEmoji} from '../enums/TickEmoji.enum.js'
import {CommandsCooldownError} from '../errors/general.js'
import InteractionManager from '../modules/interaction/managers/interaction.manager.js'
import {commandsCooldown} from '../modules/settings/commands/helpers/commands-cooldown.js'
import SettingsCommandsManager from '../modules/settings/commands/managers/settings-commands.manager.js'
import {CustomId, GuildId, UserId} from '../types/base.type.js'
import {InteractionData} from '../types/data.type.js'

export type InteractionReplyComponent = JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>>

function RowBuilder<T extends AnyComponentBuilder>(...items: T[]): ActionRowBuilder<T> {
    return new ActionRowBuilder<T>().setComponents(...items)
}

export type ActionButtonRow = ActionRowBuilder<ButtonBuilder>
export type ActionStringSelectRow = ActionRowBuilder<StringSelectMenuBuilder>
export type ActionUserSelectRow = ActionRowBuilder<UserSelectMenuBuilder>
export type ActionRoleSelectRow = ActionRowBuilder<RoleSelectMenuBuilder>
export type ActionChannelSelectRow = ActionRowBuilder<ChannelSelectMenuBuilder>
export type ActionModalRow = ActionRowBuilder<ModalActionRowComponentBuilder>

export const ButtonRowBuilder = (...buttons: ButtonBuilder[]): ActionButtonRow =>
    RowBuilder<ButtonBuilder>(...buttons)
export const StringSelectRowBuilder = (select: StringSelectMenuBuilder): ActionStringSelectRow =>
    RowBuilder<StringSelectMenuBuilder>(select)
export const UserSelectRowBuilder = (select: UserSelectMenuBuilder): ActionUserSelectRow =>
    RowBuilder<UserSelectMenuBuilder>(select)
export const RoleSelectRowBuilder = (select: RoleSelectMenuBuilder): ActionRoleSelectRow =>
    RowBuilder<RoleSelectMenuBuilder>(select)
export const ChannelSelectRowBuilder = (select: ChannelSelectMenuBuilder): ActionChannelSelectRow =>
    RowBuilder<ChannelSelectMenuBuilder>(select)
export const ModalRowBuilder = (modal: ModalActionRowComponentBuilder): ActionModalRow =>
    RowBuilder<ModalActionRowComponentBuilder>(modal)

export const StringEmptyOption = new StringSelectMenuOptionBuilder({
    label: '1', value: '1'
})

export interface iReplyOptions {
    interaction: RepliableInteraction
    replyData: InteractionReplyOptions
    userId?: UserId
    data?: InteractionData
    followUp?: boolean
}
export type iFollowUpOptions = Omit<iReplyOptions, 'followUp'>

export async function iReply(
    options: iReplyOptions
): Promise<void | Message<BooleanCache<CacheType>> | InteractionResponse<boolean>> {
    const {
        interaction,
        replyData,
        userId,
        data = {},
    } = options
    let {followUp} = options
    let msg: Message<BooleanCache<CacheType>>
    Object.assign(replyData, {fetchReply: true})
    if (interaction.isChatInputCommand()) {
        const {guildId, user} = interaction
        const cooldown = await commandsCooldown(interaction.commandName, guildId, user.id)
        if (cooldown) throw new CommandsCooldownError(interaction, cooldown as string)
        const commandService = await SettingsCommandsManager
            .getOne(interaction.guildId, interaction.commandName)
        if (!('ephemeral' in replyData)) Object.assign(replyData, {ephemeral: commandService.ephemeral})
        if (!commandService.reply) {
            await interaction.deferReply()
            return interaction.deleteReply()
        }
        if (!commandService.usage && !commandService.ephemeral) {
            followUp = true
            msg = await interaction.deferReply({fetchReply: true})
        }
    }
    const message = await (
        followUp ?
            (msg ?
                msg.reply(replyData as MessageReplyOptions) :
                interaction.followUp(replyData)) :
                    (interaction.deferred ?
                        interaction.editReply(replyData) :
                        interaction.reply(replyData)
                    )
    )
    if (msg) await interaction.deleteReply()
    if (replyData?.components && replyData?.components?.length) InteractionManager
        .createOrUpdate(interaction.guildId, message.id, userId || interaction.user.id, {data})
    return message
}

export const iFollowUp = (
    options: iFollowUpOptions
): Promise<void | Message<BooleanCache<CacheType>> | InteractionResponse<boolean>> =>
    iReply({...options, followUp: true})

export interface AutocompleteChoice {
    name: string
    value: string
}

/**
 * Фильтрует и подстраивает под стандарты дискорда массив
 */
function filterChoice(choices: AutocompleteChoice[], value: string): AutocompleteChoice[] {
    const filtered = choices.filter(choice =>
        choice.name.toLowerCase().includes(value.toLowerCase())).slice(0, DiscordLimits.CHOICES_PER_AUTOCOMPLETE)
    return filtered.map(choice => ({
        name: choice.name.slice(0, 100),
        value: choice.value.toString(),
    }))
}

export class Autocomplete {
    public choices: AutocompleteChoice[]
    public readonly i: AutocompleteInteraction
    public readonly guildId: GuildId
    public readonly user: User
    public readonly userId: UserId | undefined
    public readonly client: Client<true>

    constructor(interaction: AutocompleteInteraction) {
        this.i = interaction
        this.guildId = interaction.guildId
        this.user = interaction.user
        this.userId = interaction.user?.id
        this.client = interaction.client
    }

    run(): Promise<void> {
        const focusedOption = this.i.options.getFocused(true)
        const {name, value} = focusedOption

        this[name]()

        return this.i.respond(filterChoice(this.choices, value))
    }
}

export interface ConfirmOptions {
    interaction: RepliableInteraction
    embed: EmbedBuilder
    confirmId: string
    cancelId: string
    userId?: UserId
    data?: InteractionData
}

export function ConfirmButton(
    options: ConfirmOptions
): Promise<void | Message<BooleanCache<CacheType>> | InteractionResponse<boolean>> {
    const {
        interaction,
        embed,
        confirmId,
        cancelId,
        data
    } = options
    let {userId} = options
    if (!userId) userId = interaction.user.id
    const buttons = [
        new ButtonBuilder({
            customId: confirmId,
            style: ButtonStyle.Success,
            emoji: TickEmoji.CHECK,
        }),
        new ButtonBuilder({
            customId: cancelId,
            style: ButtonStyle.Danger,
            emoji: TickEmoji.CROSS,
        })
    ]
    const components: InteractionReplyComponent[] = [
        ButtonRowBuilder(...buttons)
    ]
    const replyData: InteractionReplyOptions = {embeds: [embed], components}
    return iReply({interaction, userId, replyData, data})
}

export interface PaginatorOptions {
    page: number
    size: number
    prevId: string
    indexId: string
    nextId: string
}

export function PaginatorButtons(options: PaginatorOptions): ActionButtonRow {
    const {page, size, prevId, indexId, nextId} = options
    const buttons = [
        new ButtonBuilder({
            customId: prevId,
            style: ButtonStyle.Secondary,
            emoji: TickEmoji.PREV
        }),
        new ButtonBuilder({
            customId: indexId,
            style: ButtonStyle.Secondary,
            label: (page+1) + '/' + size
        }),
        new ButtonBuilder({
            customId: nextId,
            style: ButtonStyle.Secondary,
            emoji: TickEmoji.NEXT
        })
    ]
    return ButtonRowBuilder(...buttons)
}

export function BackButton(backId: string, buttons: ButtonBuilder[] = []): ActionButtonRow {
    const backButton = new ButtonBuilder()
        .setCustomId(backId)
        .setStyle(ButtonStyle.Danger)
        .setEmoji(TickEmoji.BACK)
    const finalButtons = [].concat(backButton, buttons) as ButtonBuilder[]
    return ButtonRowBuilder(...finalButtons)
}
export const TurnOnOffButton = (
    interaction: RepliableInteraction,
    customId: CustomId,
    bool: boolean
): ButtonBuilder => new ButtonBuilder({
    customId, style: bool ? ButtonStyle.Danger : ButtonStyle.Success,
    label: interaction.t(bool ? 'turn:off' : 'turn:on'),
})
export const EditButton = (interaction: RepliableInteraction, editId: CustomId): ButtonBuilder =>
    new ButtonBuilder({
        customId: editId,
        style: ButtonStyle.Primary,
        label: interaction.t('edit'),
    })
export const EditResetButtons = (
    interaction: RepliableInteraction,
    editId: CustomId,
    resetId: CustomId,
    bool: boolean
): ButtonBuilder[] => [
    EditButton(interaction, editId),
    new ButtonBuilder({
        customId: resetId,
        style: ButtonStyle.Danger,
        label: interaction.t('reset'),
        disabled: bool
    })
]
export const DeleteButton = (interaction: RepliableInteraction, deleteId: CustomId): ButtonBuilder =>
    new ButtonBuilder({
        customId: deleteId,
        style: ButtonStyle.Danger,
        label: interaction.t('delete')
    })

export async function Modal(
    interaction: ButtonInteraction | AnySelectMenuInteraction,
    customId: string,
    title: string,
    inputs: TextInputBuilder[],
): Promise<void> {
    const components = inputs.map(input => ModalRowBuilder(input))
    const modal = new ModalBuilder({customId, title}).addComponents(...components)
    return interaction.showModal(modal)
}