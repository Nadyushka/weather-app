/**
 * * Модель описывающая опции выбора языка
 */

export class LangOptionModel {
    /**
     * * id языка
     */
    Id!: number
    /**
     * * Язык
     */
    Language!: 'en' | 'ru' | 'by'

    constructor(obj?: Partial<LangOptionModel>) {
        Object.assign(this, obj)
    }
}
