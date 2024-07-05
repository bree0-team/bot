import {InteractionReplyOptions} from 'discord.js'
import {GuildEmbed} from '../../../../helpers/embed.js'
import {ButtonRowBuilder, InteractionReplyComponent} from '../../../../services/interaction.js'
import {UserId} from '../../../../types/base.type.js'
import XpManager from '../../managers/xp.manager.js'
import {BaseCommands} from '../structures/BaseCommands.js'
import {RANK_REFRESH} from './enums/CustomIds.enum.js'
import {RankUserData} from './types/data.type.js'

export class View extends BaseCommands {
    getRank(userId: UserId): number | null {
        const xpManager = XpManager.findAllByGuildId(this.guildId)
            .sort((a, b) => b.value - a.value)
            .map(i => i)
        const user = xpManager
            .map(({userId}, index) => ({userId, index}))
            .find(i => i.userId === userId)
        return user ? user.index + 1 : null
    }
    async run(userId: UserId) {
        const user = this.getClientUser(userId)
        const userXp = XpManager.findOne(this.guildId, userId)
        const embed = GuildEmbed(this.guildId)
            .setAuthor({name: user.displayName, iconURL: user.avatarURL()})
            .setDescription(this.progressDescription(this.getRank(userId) ?? this.t('no'), userXp?.value))
        const components: InteractionReplyComponent[] = [
            ButtonRowBuilder(this.refreshButton(RANK_REFRESH))
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        const data: RankUserData = {userId}
        return this.reply({replyData, data})
    }
}