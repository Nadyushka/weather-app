/**
 * * Модель данных для информации о пользователе c картинками
 */
export class PersonalDataWithImagesBlockModel {
    /** Заголовок **/
    Title?: string;
    /** Фамилия */
    Images?: string[];

    constructor(obj?: Partial<PersonalDataWithImagesBlockModel>) {
        Object.assign(this, obj);
    }
}
