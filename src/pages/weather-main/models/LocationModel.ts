/**
 * * Модель, описывающая местоположение пользователя
 */

export class LocationModel {
    Country!: string
    City!: string

    constructor (obj: Partial<LocationModel>) {
        Object.assign(this, obj)
    }
}
