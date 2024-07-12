import {StatusEnum} from "@/pages";

/**
 * * Модель данных книги
 */
export class UserModel {
    /** Имя **/
    Name?: string;
    /** Фамилия */
    Surname?: string;
    /** Возраст */
    Age?: number;
    /** Образование */
    Education?: string;
    /** Статус */
    Status: StatusEnum
    /** Профессия */
    Occupation?: string;
    /** Место проживания */
    Location?: string;
    /** Техническая грамотность */
    TechLiterate?: string;
    /** Фото */
    ImageUrl?: string;

    constructor(obj?: Partial<UserModel>) {
        Object.assign(this, obj);
    }
}
