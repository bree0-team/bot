import {ProgressEmoji} from '../enums/ProgressEmoji.enum.js'

const bars = Array.from({ length: 9 }, (_, i) => {
    const center = ProgressEmoji.CENTER_ON.repeat(Math.min(i > 1 ? i - 1 : 0, 6))
        + ProgressEmoji.CENTER_OFF.repeat(Math.max(0, 6 - i + (i === 0 ? 0 : 1)))
    return `${i === 0
        ? ProgressEmoji.LEFT_OFF
        : ProgressEmoji.LEFT_ON}${center}${i === 8
        ? ProgressEmoji.RIGHT_ON
        : ProgressEmoji.RIGHT_OFF}`
})
const progress = (xpMinusBefore: number, afterMinusBefore: number): number =>
    Math.round(Number((xpMinusBefore / afterMinusBefore).toFixed(2)) * 8)
export const progressBar = (xpMinusBefore: number, afterMinusBefore: number): string =>
    bars[progress(xpMinusBefore, afterMinusBefore)]