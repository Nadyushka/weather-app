/**
 * * Модель данных для информации о пользователе
 */
export class PersonalDescriptionModel {
    /** Заголовок **/
    Title?: string;
    /** Фамилия */
    Text?: string;
    /** Возраст */
    List?: string[];


    constructor(obj?: Partial<PersonalDescriptionModel>) {
        Object.assign(this, obj);
    }
}
