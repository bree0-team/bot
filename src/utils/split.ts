import moment from 'moment'

interface DurationReturn {
    years?: number
    months?: number
    weeks?: number
    days?: number
    hours?: number
    minutes?: number
    seconds?: number
}

export const durationStringNumber: Record<string, number> = {
    'w': 60 * 60 * 24 * 7,
    'd': 60 * 60 * 24,
    'h': 60 * 60,
    'm': 60
}

export interface PagesItems<I> {
    items: I[]
    page: number
    size: number
    totalItems: number
    totalPages: number
}

export class SplitUtils {
    /**
     * Сократить JS Date.now() на 3 знака
     * @return {number}
     */
    static now = (): number => Number((Date.now() / 1000).toFixed())

    /**
     * Найти последний ключ из массива в объекте
     * @param keys {Array<string>}
     * @param object {Object}
     * @return {*}
     */
    static findInObject = (keys: string[], object: Object) => keys.reduce((acc, key) =>
        (acc && acc[key] !== undefined) ? acc[key] : undefined, object)

    /**
     * Получить элемент в зависимости от числа
     * @param num {number}
     * @param item1 {*}
     * @param item2 {*}
     * @param item3 {*}
     * @returns {*}
     */
    static getEnding(num: number, item1: any, item2: any, item3: any) {
        let number = Number(num) % 100
        if (15 > number && number > 10) return item3
        number = Number(num) % 10
        if (number === 0) return item3
        if (number === 1) return item1
        if (number > 4) return item3
        if (number > 1) return item2
    }

    static getDuration(seconds: number): DurationReturn {
        const duration = moment.duration(seconds, 'seconds')
        const years = duration.years()
        const months = duration.months()
        const weeks = duration.weeks()
        let days = duration.days()
        if (days) days = (weeks && days >= 7) ? days - weeks * 7 : days
        const hours = duration.hours()
        const minutes = duration.minutes()
        const remainingSeconds = duration.seconds()
        return Object.assign(
            {},
            years ? {years} : {},
            months ? {months} : {},
            weeks ? {weeks} : {},
            days ? {days} : {},
            hours ? {hours} : {},
            minutes ? {minutes} : {},
            remainingSeconds ? {seconds: remainingSeconds} : {},
        ) as DurationReturn
    }

    static stringToDuration(text: string): number {
        const regexp = /(\d+)(\S?)/g
        const regExpArray = [...text.matchAll(regexp)]
        const durationEnd = 0
        if (!regExpArray.length) return durationEnd
        const items: Record<string, number> = regExpArray.reduce((acc, value) => {
            let key = value[2].toLowerCase()
            const val = Number(value[1])
            if (!key) key = 's'
            if (acc[key]) acc[key] += val
            else acc[key] = val
            return acc
        }, {})
        return Object.entries(items).map(([key, value]) => {
            if (key in durationStringNumber) return durationStringNumber[key] * value
            return value
        }).reduce((acc, value) => acc += value, 0)
    }

    static durationToString(duration: number): string {
        let remainingDuration: number = duration
        const result: string[] = []
        for (const [key, value] of Object.entries(durationStringNumber)) {
            const count = Math.floor(remainingDuration / value)
            if (count > 0) {
                result.push(`${count}${key}`)
                remainingDuration -= count * value
            }
        }
        if (remainingDuration) result.push(`${remainingDuration}s`)
        return result.join('')
    }

    /**
     * Преобразование decimal в rgb
     * @param decimal {number} - number
     * @returns {number[]}
     */
    static decimalToRgb = (decimal: number): [number, number, number] => [
        (decimal >> 16) & 0xff,
        (decimal >> 8) & 0xff,
        decimal & 0xff
    ]

    static hexToDecimal(hex: string): number {
        const color = parseInt(hex.replaceAll('#', ''), 16)
        return color > 0 ? color : 0
    }

    static decimalToHex = (decimal: number): string => decimal.toString(16).padStart(6, '0')
    static getPages<I extends any>(items: I[], page: number, size: number = 10): PagesItems<I> {
        const totalItems: number = items.length
        const totalPages: number = Math.ceil(totalItems/size)
        return {items: items.slice(page*size, page*size+size), page, size, totalItems, totalPages}
    }
}