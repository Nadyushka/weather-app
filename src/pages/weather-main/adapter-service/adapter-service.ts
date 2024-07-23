import {ref} from "vue";
import {LanguagesEnum, WeatherForecastModel} from '@/pages'
import {WEATHER_API} from "../../../../token.local";


export class AdapterService {
    /** Сервис */
    private static instance: AdapterService

    public static getInstance() {
        if (!AdapterService.instance) {
            AdapterService.instance = new AdapterService()
        }
        return AdapterService.instance
    }

    /** Текущий язык */
    private _CurrentLanguage = ref<LanguagesEnum>( LanguagesEnum.English)

    set CurrentLanguage(language: LanguagesEnum) {
        this._CurrentLanguage.value = language
        if (this._SearchCity.value) {
          this.getLocationWithSearchCity(this._SearchCity.value)
        } else {
            this.getLocation()
        }
    }


    /** Город для поиска */
    private _SearchCity = ref<string>()

    set SearchCity(value: string) {
        this._SearchCity.value = value
    }

    /** Тип температуры */
    private _TemperatureType = ref< 'C' | 'F'> ('C')

    set TemperatureType(value: 'C' | 'F') {
        this._TemperatureType.value = value
        this.transformTemperature()
    }

    get TemperatureType() {
      return this._TemperatureType.value
    }

    /** Широта */
    Latitude = ref<string>('53.90')
    /** Долгота */
    Longitude = ref<string>('27.57')
    /** Страна */
    Country = ref<string>( 'Belarus')
    /** Город */
    City = ref<string>( 'Minsk')
    /** Загрузка */
    IsLoading = ref<boolean>(false)
    /** Погода на сегодня */
    TodayForecast  = ref<WeatherForecastModel>( new WeatherForecastModel())
    /** Погода на 3 дня */
    FutureForecast = ref<WeatherForecastModel[]>( [])

    /**
     * * Получить локацию пользователя
     */
    async getLocation () {
        this.IsLoading.value = true
        return  new Promise<string | undefined>(async (resolve) => {
            await fetch('https://ipapi.co/json')
                .then(res =>  res.json())
                .then(async (res) => {
                    const translatedCity = await this.getCityTranslation(res.city)

                    this.Country.value = new Intl.DisplayNames(this._CurrentLanguage.value, {type: "region"}).of(res.country_code)
                    this.City.value = translatedCity[0]?.name || res.city
                    this.Longitude.value = res.longitude.toString()
                    this.Latitude.value = res.latitude.toString()

                    await this.getWeather()

                })
                .catch(e => console.log('getLocation', e))
                .finally(() =>   this.IsLoading.value = false )
        })
    }

    /**
     * * Получить перевод города
     */
    async getCityTranslation (city: string) {

        return new Promise<string | undefined>(async (resolve) => {
            await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&accept-language=${this._CurrentLanguage.value}`)
                .then((res) => res.json())
                .then((res) => resolve(res))
        })
    }

    async getLocationWithSearchCity (city: string) {
        this.IsLoading.value = true

        return new Promise<string>(async (resolve) => {
            await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1&accept-language=en&addressdetails=1`)
                .then((res) => res.json())
                .then(async (res) => {


                    const translatedCity = await this.getCityTranslation(res[0].name || res[0].address.city || res[0].address.state)

                    this.Country.value = new Intl.DisplayNames(this._CurrentLanguage.value, {type: "region"}).of(res[0].address.country_code.toUpperCase())
                    this.City.value = translatedCity[0]?.name || res[0].address.city
                    this.Longitude.value = res[0].lon.toString()
                    this.Latitude.value = res[0].lat.toString()

                    await this.getWeather()
                })
                .catch(e => console.log('getLocationWithSearchCity', e))
                .finally(() =>   this.IsLoading.value = false )
        })
    }

    async getWeather () {
        this.IsLoading.value = true

        return new Promise(async(resolve) => {
            await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.City.value}?unitGroup=metric&include=days&key=${WEATHER_API}&contentType=json&lang=${this._CurrentLanguage.value}`)
                .then((res) => res.json())
                .then(async (res) => {

                    this.TodayForecast.value = this.mapResponseToWeatherModel(res.days[0])
                    this.FutureForecast.value = res.days.slice(1,4).map(forecast => this.mapResponseToWeatherModel(forecast))

                    /** Чтобы тип температуры совпадал с выбранным на переключателе */
                    if (this._TemperatureType.value == 'F' ) this.transformTemperature()
                })
                .catch(e => console.log('getWeather', e))
                .finally(() =>   this.IsLoading.value = false )
        })
    }

    /** Привести значение температуры к выбранному типу */
    transformTemperature () {
        this.TodayForecast.value = this._TemperatureType.value == 'F' ? {
            ...this.TodayForecast.value,
            Temperature: this.toFahrenheit(+this.TodayForecast.value.Temperature).toString(),
            Feelslike: this.toFahrenheit(+this.TodayForecast.value.Feelslike).toString()
            } : {
            ...this.TodayForecast.value,
            Temperature: this.toCelsius(+this.TodayForecast.value.Temperature).toString(),
            Feelslike: this.toCelsius(+this.TodayForecast.value.Feelslike).toString()
        }


        this.FutureForecast.value = this.FutureForecast.value.map(forecast => {
            return this._TemperatureType.value == 'F' ? {
                ...forecast,
                Temperature: this.toFahrenheit(+forecast.Temperature).toString(),
            } : {
                ...forecast,
                Temperature: this.toCelsius(+forecast.Temperature).toString(),
            }
        })
    }

    /** Приведение к Celsius */
    toCelsius (temp: number) {
        return Math.round((temp - 32) / 1.8)
    }

    /** Приведение к toFahrenheit */
    toFahrenheit (temp:number) {
        return  Math.round(temp * 1.8 + 32)
    }

    /** Приведение к моделе погоды */
    mapResponseToWeatherModel(weather) {
        return new WeatherForecastModel({
            Temperature: Math.round(weather.temp).toString(),
            Feelslike: weather.feelslike,
            WeatherDescription: weather.conditions,
            Wind: weather.windspeed,
            Humidity: weather.humidity + '%',
            WeatherIcon: '/' + weather.icon + '.svg'
        })
    }

}
