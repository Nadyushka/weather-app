/**
 * * Модель, описывающая погоду на день
 **/

export class WeatherForecastModel {
    /** Температура */
    Temperature!: string
    /** Как ощущается температура */
    Feelslike!: string
    /** Описание погоды */
    WeatherDescription!: string
    /** Ветер */
    Wind!: string
    /** Влажность */
    Humidity!: string
    /** Иконка с погодой */
    WeatherIcon!: string

    constructor (obj?: Partial<WeatherForecastModel>) {
        Object.assign(this, obj)
    }
}
