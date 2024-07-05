import {EmbedBuilder, InteractionReplyOptions, RepliableInteraction} from 'discord.js'
import {EmbedColors} from '../enums/EmbedColors.enum.js'
import {EmotesImages} from '../enums/EmotesImages.enum.js'
import {EmbedField} from '../helpers/embed.js'
import {iFollowUp, iReply} from '../services/interaction.js'

export class CustomError extends Error {
    public fields: EmbedField[]

    constructor(message: string, ...fields: EmbedField[]) {
        super(message)
    }
}

export class NoRightsError extends CustomError {
}

export class CommandsCooldownError extends CustomError {
    constructor(interaction: RepliableInteraction, time: string) {
        super(interaction.t('common:error:cooldown', {time}))
    }
}

export class PaginatorMaxPageError extends CustomError {
    constructor(interaction: RepliableInteraction) {
        super(interaction.t('common:error:paginator_max_page'))
    }
}

export async function catchError(interaction: RepliableInteraction, error: Error) {
    const {user} = interaction
    const embed = new EmbedBuilder()
        .setAuthor({name: user.displayName, iconURL: user.displayAvatarURL()})
        .setColor(EmbedColors.DENIED)
        .setThumbnail(EmotesImages.SAD)

    if (error instanceof CustomError) {
        embed.setDescription(error.message)
        if (error.fields) embed.addFields(...error.fields)
    } else {
        embed.setDescription('There was an error while executing this command!')
    }

    const replyData: InteractionReplyOptions = {embeds: [embed], ephemeral: true}
    try {
        if (!interaction.deferred) await interaction.deferReply({ephemeral: true})
        await (interaction.isChatInputCommand() ? interaction.reply(replyData) : interaction.followUp(replyData))
    } catch (error) {
        if (['InteractionAlreadyReplied', 10062].includes(error.code))
            return interaction.followUp(replyData).catch(e => {
                if (['InteractionNotReplied'].includes(e.code))
                    return interaction.channel.send({embeds: [embed]})
                throw error
            })
        throw error
    }
}