import {bold, ButtonBuilder, ButtonStyle, inlineCode} from 'discord.js'
import {ProgressEmoji} from '../../../../enums/ProgressEmoji.enum.js'
import {TickEmoji} from '../../../../enums/TickEmoji.enum.js'
import {ballpark} from '../../../../helpers/ballpark.js'
import {progressBar} from '../../../../helpers/progress-bars.js'
import {BaseStructure} from '../../../../structures/base.js'
import {XpUtils} from '../../utils/xp.js'

export abstract class BaseCommands extends BaseStructure {
    refreshButton = (refreshId: string) => new ButtonBuilder({
        customId: refreshId,
        style: ButtonStyle.Secondary,
        emoji: TickEmoji.REFRESH
    })
    progressDescription(rank: number | string, xp: number = 0): string {
        const xpUtil = new XpUtils(this.guildId)
        const level = xpUtil.findLevel(xp)
        const totalXp = xpUtil.getTotalXp(level)
        const nextLevelXp = xpUtil.getLevelXp(level+1)
        const xpMinusTotal = xp-totalXp
        return [
            ProgressEmoji.XP + ' ' + progressBar(xpMinusTotal, nextLevelXp) + ' ' +
            inlineCode(ballpark(xpMinusTotal) + '/' + ballpark(nextLevelXp)) + ' ('
            + (xpMinusTotal/nextLevelXp*100).toFixed() + '%)',
            bold(this.t('rank') + ': ') + rank + ' | '
            + bold(this.t('level') + ': ') + level
        ].join('\n')
    }
}