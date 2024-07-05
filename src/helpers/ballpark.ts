/**
 * Форматирование чисел под короткий формат
 * @param value {number} - число
 * @return {string}
 */
export const ballpark = (value: number): string => {
    /*const names = ['', 'K', 'M', 'G'];
    const number = Math.floor(Math.log(num) / Math.log(1000));
    return `${ (num / Math.pow(1024, number)).toFixed(2) }${ names[number] }`;*/
    const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
    const i = Math.log(value) / Math.log(1000) | 0
    return `${ Number((value / Math.pow(1000, i)).toFixed(2)) }${ units[i] }`
}