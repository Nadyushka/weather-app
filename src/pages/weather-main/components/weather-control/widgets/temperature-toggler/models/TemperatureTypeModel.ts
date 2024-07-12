/**
 * * Модель, описывающая температуру
 */

export class TemperatureTypeModel {
    /**
     * * Тип температуры
     */
    Type!: 'C' | 'F'
    /**
     * * Тип температуры для отображения пользователю
     */
    ShownType!: '°F' | '°C'

    constructor(obj?: Partial<TemperatureTypeModel>) {
        Object.assign(this, obj)
    }
}
