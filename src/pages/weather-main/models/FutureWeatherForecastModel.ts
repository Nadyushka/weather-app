import { WeatherForecastModel } from "./WeatherForecastModel";

/**
 * * Модель, описывающая погоду на будущие дни
 */

export class FutureWeatherForecastModel extends WeatherForecastModel {
    /** Полный день недели */
    DayOfWeek!: string

    constructor (obj?: Partial<FutureWeatherForecastModel>) {
        super()
        Object.assign(this, obj)
    }
}
