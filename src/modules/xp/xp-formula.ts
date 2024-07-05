/**
 * Получить количество опыта клана для следующего уровня
 * @param level {number} - уровень
 * @returns {number}
 */
const getNextXp = level => (level**3)*12+106*(level*4)+388*level

/**
 * Получить общее количество опыта клана на нужный уровень
 * @param level {number} - уровень
 * @returns {number}
 */
const getTotalXp = level => {
    let totalXpNeeded = 0
    for (let i = 0; i <= level; i++) totalXpNeeded += getNextXp(i)
    return totalXpNeeded
}

/**
 * Находит уровень по количеству опыта клана
 * @param xp {number} - Количество опыта
 * @return {number} - Уровень
 */
const findLevel = xp => {
    let level = 0
    let totalXp = 0
    while (totalXp <= xp) {
        level++
        totalXp += getNextXp(level)
    }
    return level - 1
}

module.exports = {getNextXp, getTotalXp, findLevel}