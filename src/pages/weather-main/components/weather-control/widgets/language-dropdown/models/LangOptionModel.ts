/**
 * * Модель описывающая опции выбора языка
 */

import { LanguagesEnum } from '@/pages'

export class LangOptionModel {
    /**
     * * id языка
     */
    Id!: number
    /**
     * * Язык
     */
    Language!: LanguagesEnum

    constructor(obj?: Partial<LangOptionModel>) {
        Object.assign(this, obj)
    }
}
