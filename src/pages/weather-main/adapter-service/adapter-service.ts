import {ref} from "vue";


export class AdapterService {
    /** Сервис */
    private static instance: AdapterService

    public static getInstance() {
        if (!AdapterService.instance) {
            AdapterService.instance = new AdapterService()
        }
        return AdapterService.instance
    }

    private static _CurrentLanguage = 'en'

    set CurrentLanguage(language: 'en' | 'ru' | 'by') {
        AdapterService._CurrentLanguage = language
        this.getLocation()
    }

    /** Тип температуры */
    TemperatureType = ref<'C' | 'F'>('C')
    /** Широта */
    Latitude = ref<string>()
    /** Долгота */
    Longitude = ref<string>()
    /** Страна */
    Country = ref<string>()
    /** Город */
    City = ref<string>()
    /** Загрузка */
    IsLoading = ref<boolean>(false)
    /** Город для поиска */
    SearchCity  = ref<string>()


    /**
     * * Получить локацию пользователя
     */
    async getLocation () {
        this.IsLoading.value = true
        return  new Promise<string | undefined>(async (resolve) => {
            await fetch('https://ipapi.co/json')
                .then(res =>  res.json())
                .then(async res => {
                    const translatedCity = await this.getCityTranslation(res.city)

                    this.Country.value = new Intl.DisplayNames(AdapterService._CurrentLanguage, {type: "region"}).of(res.country_code)
                    this.City.value = translatedCity[0].name
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
            await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&accept-language=${AdapterService._CurrentLanguage}`)
                .then((res) => res.json())
                .then((res) => resolve(res))
        })
    }

    async getWeather () {

    }

    async searchCity () {

    }

    async updateAppData () {

    }
}
