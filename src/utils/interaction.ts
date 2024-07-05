import {
    DiscordAPIError,
    GuildChannelCreateOptions,
    GuildChannelTypes,
    GuildMember,
    GuildMemberEditOptions,
    MappedGuildChannelTypes,
    RepliableInteraction,
} from 'discord.js'
import {ChannelMissingPermissionError} from '../errors/forbidden/channel.js'
import {UserMissingPermissionError} from '../errors/forbidden/user.js'
import {PermissionKeys} from './permission.js'

const channelErrors = (interaction: RepliableInteraction) => ({
    50013: new ChannelMissingPermissionError(interaction, PermissionKeys.Administrator)
})
const userErrors = (interaction: RepliableInteraction) => ({
    50013: new UserMissingPermissionError(interaction, PermissionKeys.ManageNicknames)
})

export class InteractionUtils {
    static async createChannel<Type extends GuildChannelTypes>(
        interaction: RepliableInteraction,
        options: GuildChannelCreateOptions & { type: Type },
    ): Promise<MappedGuildChannelTypes[Type]> {
        let channel: MappedGuildChannelTypes[Type];
        try {
            channel = await interaction.guild.channels.create(options)
        } catch (error) {
            if (error instanceof DiscordAPIError) {
                const errors = channelErrors(interaction)
                if (error.code in errors) throw errors[error.code]
            }
            throw error
        }
        return channel
    }
    static async editMember(
        interaction: RepliableInteraction,
        member: GuildMember,
        options: GuildMemberEditOptions
    ): Promise<GuildMember> {
        try {
            await member.edit(options)
        } catch (error) {
            if (error instanceof DiscordAPIError) {
                const errors = userErrors(interaction)
                if (error.code in errors) throw errors[error.code]
            }
            throw error
        }
        return member
    }
}