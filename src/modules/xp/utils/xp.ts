import {GuildId} from '../../../types/base.type.js'
import {defaultFormula} from '../../settings/xp/constants/defaults.js'
import SettingsXpManager from '../../settings/xp/managers/settings-xp.manager.js'

export class XpUtils {
    private formula: string
    constructor(private readonly guildId: GuildId) {
        const xpManager = SettingsXpManager.findOne(guildId)
        this.formula = xpManager?.formula ?? defaultFormula
    }
    /**
     * Получить количество опыта для следующего уровня
     * @param level {number} - Уровень
     * @returns {number}
     */
    getLevelXp(level: number): number {
        const expression = this.formula.replace(/{level}/g, level.toString());
        const formula = new Function('return ' + expression)
        return formula() as number
    }
    /**
     * Получить общее количество опыта на нужный уровень
     * @param level {number} - Уровень
     * @returns {number}
     */
    getTotalXp(level: number): number {
        let totalXpNeeded = 0
        for (let i = 0; i <= level; i++) totalXpNeeded += this.getLevelXp(i)
        return totalXpNeeded
    }
    /**
     * Найти уровень по количеству опыта
     * @param xp {number} - Количество опыта
     * @return {number} - Уровень
     */
    findLevel(xp: number): number {
        let level = 0
        let totalXp = 0
        while (totalXp <= xp) {
            level++
            totalXp += this.getLevelXp(level)
        }
        return level - 1
    }
}