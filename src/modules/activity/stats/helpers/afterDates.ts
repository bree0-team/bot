export class AfterDates {
    getDate(day: number) {
        const date = new Date()
        date.setDate(date.getDate() - day)
        return date
    }
    day = (): Date => this.getDate(1)
    week = (): Date => this.getDate(7)
    month = (): Date => this.getDate(30)
}