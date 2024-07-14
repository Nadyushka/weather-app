<script setup lang="ts">
import {
  LocationDate,
  WeatherInfo,
  WeatherForecast,
  MapLocation,
  DateModel,
  LocationModel,
  WeatherForecastModel, FutureWeatherForecastModel
} from "@/pages";
import {onBeforeUnmount, onMounted, ref, watch, provide, Ref} from "vue";
import {getCurrentTime, getToday} from "@/shared";

/**
 * * Текущее время
 */
const currentTime = ref<string>()
/**
 * * Сегодняшний день
 */
const today = ref<DateModel>(new DateModel())
/**
 * * Текущее местополодение пользователя
 */
const location = ref(new LocationModel({Country: 'Belarus', City: 'Minsk'}))

let timer

/**
 * * После монтирования компонента
 */
onMounted(() => {
  getTime()
  today.value = getToday('en')

  timer = setInterval(() =>  getTime(), 1000)
})
/**
 * * До размонтирования компонента
 */
onBeforeUnmount(() => clearInterval(timer))

/**
 * * Получить актуальное время
 */
const getTime = () => currentTime.value = getCurrentTime()

const todayForecast = ref(new WeatherForecastModel({
  Temperature: '10',
  Feelslike: '10°',
  WeatherDescription: 'Overcast',
  Wind: '7 m/s',
  Humidity: '83%',
  WeatherIcon: './overcast-icon.svg'
}))

const futureForecast = ref([
    new WeatherForecastModel({
      Temperature: '7°',
      WeatherIcon: './cloudy-icon.svg',
    }),
  new WeatherForecastModel({
    Temperature: '6°',
    WeatherIcon: './overcast-icon.svg',
  }),
  new WeatherForecastModel({
    Temperature: '3°',
    WeatherIcon: './overcast-icon.svg',
  })
])

const activeLanguage = ref<'en' | 'ru' | 'by'>('en')

const setActiveLanguage = (event: CustomEvent<{ activeLanguage: 'en' | 'ru' | 'by' }>) => {
  activeLanguage.value = event.detail.activeLanguage
}

document.addEventListener('set-active-language', setActiveLanguage)

provide<Ref<'en' | 'ru' | 'by'>>('activeLanguage', activeLanguage)

watch(
    () => activeLanguage.value,
    () => {
      today.value = getToday(activeLanguage.value)
    }
)
</script>

<template>
  <div class="info">
    <div class="info__weather">
      <location-date :currenTime="currentTime" :today="today" :location="location"/>
      <weather-forecast :todayForecast="todayForecast" :futureForecast="futureForecast"/>
    </div>
    <div class="info__map">
      <map-location/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info {
  display: flex;
  justify-content: space-between;
}
</style>
