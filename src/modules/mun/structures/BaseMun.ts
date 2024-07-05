import {EmbedBuilder, GuildMember, User} from 'discord.js'
import {EmbedField, GuildEmbed} from '../../../helpers/embed.js'
import {BaseStructure} from '../../../structures/base.js'

export abstract class BaseMun extends BaseStructure {
    embed = (member: GuildMember | User, oldValue: string, newValue: string): EmbedBuilder =>
        GuildEmbed(this.guildId, {
            author: {
                name: this.t('mun:title', {user: member.displayName}),
                iconURL: member.displayAvatarURL()
            },
            description: member.toString(),
            fields: [
                EmbedField(this.t('mun:current'), oldValue),
                EmbedField(this.t('mun:desired'), newValue)
            ]
        })
}