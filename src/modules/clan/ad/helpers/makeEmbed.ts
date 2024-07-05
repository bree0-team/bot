import {EmbedBuilder, EmbedData} from 'discord.js'

export function makeEmbed(options: EmbedData): EmbedBuilder {
    const {
        author,
        title,
        description,
        url,
        color,
        fields,
        image,
        thumbnail,
        footer
    } = options
    const embed = new EmbedBuilder()
    if (author?.name) embed.setAuthor(author)
    if (title) embed.setTitle(title)
    if (description) embed.setDescription(description)
    if (url) embed.setURL(url)
    if (color) embed.setColor(color)
    if (fields.length) embed.setFields(...fields)
    if (image?.url) embed.setImage(image.url)
    if (thumbnail?.url) embed.setThumbnail(thumbnail.url)
    if (footer?.text) embed.setFooter(footer)
    if (!embed.length) embed.setDescription('empty')
    return embed
}