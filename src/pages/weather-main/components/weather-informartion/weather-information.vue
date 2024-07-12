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
import {onBeforeUnmount, onMounted, ref} from "vue";
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
  currentTime.value = getCurrentTime()
  today.value = getToday('en')

  timer = setInterval(() =>  getCurrentTime(), 1000)
})
/**
 * * До размонтирования компонента
 */
onBeforeUnmount(() => clearInterval(timer))

/**
 * * Получить актуальное время
 */
const getCurrentTime = () => currentTime.value = getCurrentTime()

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
