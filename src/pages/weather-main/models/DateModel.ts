/**
 * * Модель, описывающая текущий день
 */

export class DateModel {
    DayOfWeek!: string
    Month!: string
    Day!: number

    constructor (obj?: Partial<DateModel>) {
        Object.assign(this, obj)
    }
}
