import {InteractionReplyOptions, userMention} from 'discord.js'
import {GuildEmbed} from '../../../../helpers/embed.js'
import {ButtonRowBuilder, InteractionReplyComponent} from '../../../../services/interaction.js'
import {PageData} from '../../../../types/data.type.js'
import XpManager from '../../managers/xp.manager.js'
import {BaseCommands} from '../structures/BaseCommands.js'
import {TOP_INDEX, TOP_NEXT, TOP_PREV, TOP_REFRESH} from './enums/CustomIds.enum.js'
import {TopNoValuesError} from './errors/xp-top.error.js'

interface ItemsPages {
    items: string[]
    pages: number
}

export class Top extends BaseCommands {
    getItems(page: number, limit: number): ItemsPages {
        const usersXp = XpManager.findAllByGuildId(this.guildId)
            .sort((a, b) => b.value - a.value)
            .map(i => i)
        const items = usersXp.map((i, index) => [
            userMention(i.userId),
            this.progressDescription(index+1, i.value)
        ].join('\n'))
        return {items: items.slice(page*limit, page*limit+limit), pages: Math.ceil(items.length/limit)}
    }
    async run(page: number = 0) {
        const {items, pages} = this.getItems(page, 10)
        if (!items.length) throw new TopNoValuesError(this.i)
        const embed = GuildEmbed(this.guildId)
            .setAuthor({name: this.guild.name, iconURL: this.guild.iconURL()})
            .setDescription(items.join('\n\n'))
        const components: InteractionReplyComponent[] = []
        const refresh = this.refreshButton(TOP_REFRESH)
        if (pages > 1) components.push(this.paginator({
            page, size: pages,
            prevId: TOP_PREV, indexId: TOP_INDEX, nextId: TOP_NEXT
        }).addComponents(refresh))
        else components.push(ButtonRowBuilder(refresh))
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: PageData = {page, size: pages}
        return this.reply({replyData, data})
    }
}