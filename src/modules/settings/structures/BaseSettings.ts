import {EmbedBuilder} from 'discord.js'
import {GuildEmbed} from '../../../helpers/embed.js'
import {BaseStructure} from '../../../structures/base.js'

export abstract class BaseSettings extends BaseStructure {
    protected guildEmbed = (title: string): EmbedBuilder => GuildEmbed(this.guildId, {title})
}