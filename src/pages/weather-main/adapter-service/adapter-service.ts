import {ref} from "vue";
import { LanguagesEnum } from '@/pages'


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
    private  _CurrentLanguage = 'en'

    set CurrentLanguage(language: LanguagesEnum) {
        this._CurrentLanguage = language
        if (this._SearchCity.value) {
          this.getLocationWithSearchCity(this._SearchCity.value)
        } else {
            this.getLocation()
        }
    }


    /** Город для поиска */
    private _SearchCity  = ref<string>()

    set SearchCity(value: string) {
        this._SearchCity.value = value
    }

    /** Тип температуры */
    TemperatureType = ref<'C' | 'F'>('C')
    /** Широта */
    Latitude = ref<string>('53.90')
    /** Долгота */
    Longitude = ref<string>('27.57')
    /** Страна */
    Country = ref<string>()
    /** Город */
    City = ref<string>()
    /** Загрузка */
    IsLoading = ref<boolean>(false)

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

                    this.Country.value = new Intl.DisplayNames(this._CurrentLanguage, {type: "region"}).of(res.country_code)
                    this.City.value = translatedCity[0]?.name || res.city
                    this.Longitude.value = res.longitude.toString()
                    this.Latitude.value = res.latitude.toString()

                    this.IsLoading.value = false
                })
        })
    }

    /**
     * * Получить перевод города
     */
    async getCityTranslation (city: string) {

        return new Promise<string | undefined>(async (resolve) => {
            await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&accept-language=${this._CurrentLanguage}`)
                .then((res) => res.json())
                .then((res) => resolve(res))
        })
    }

    async getLocationWithSearchCity (city: string) {
        return new Promise<string>(async (resolve) => {
            await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1&accept-language=en&addressdetails=1`)
                .then((res) => res.json())
                .then(async (res) => {
                    console.log(res)
                    const translatedCity = await this.getCityTranslation(res[0].name || res[0].address.city || res[0].address.state)

                    this.Country.value = new Intl.DisplayNames(this._CurrentLanguage, {type: "region"}).of(res[0].address.country_code.toUpperCase())
                    this.City.value = translatedCity[0]?.name || res[0].address.city
                    this.Longitude.value = res[0].lon.toString()
                    this.Latitude.value = res[0].lat.toString()

                    this.IsLoading.value = false
                })
        })
    }

    async getWeather () {

    }

    async searchCity () {

    }

    async updateAppData () {

    }
}
