<script setup lang="ts">
import {
  LocationDate,
  WeatherForecast,
  MapLocation,
  DateModel,
  LocationModel,
  LanguagesEnum
} from "@/pages";
import {onBeforeUnmount, onMounted, ref, watch, provide, Ref, computed} from "vue";
import {getCurrentTime, getToday} from "@/shared";

import {AdapterService} from "@/pages";

/** Сервис для уравления данными */
const adapterService = AdapterService.getInstance()

/** Текущее время */
const currentTime = ref<string>()
/** Сегодняшний день */
const today = ref<DateModel>(new DateModel())
/** Язык приложения */
const activeLanguage = ref<LanguagesEnum>(LanguagesEnum.English)

/** Передаем язык приложения  */
provide<Ref<LanguagesEnum>>('activeLanguage', activeLanguage)

/** Текущее местоположение пользователя */
const location = computed(() =>
    new LocationModel({ Country: adapterService.Country.value, City: adapterService.City.value }))
/** Погода на сегодня */
const todayForecast = computed( () => adapterService.TodayForecast.value)
/** Погода на 3 дня вперед */
const futureForecast = computed( () => adapterService.FutureForecast.value)

/** Таймер для запуска setInterval для времени */
let timer

/** После монтирования компонента */
onMounted(() => {
  getTime()
  today.value = getToday(LanguagesEnum.English)

  timer = setInterval(() =>  getTime(), 1000)
})
/** До размонтирования компонента */
onBeforeUnmount(() => clearInterval(timer))


/** Подписка на изменение языка */
watch(
    () => activeLanguage.value,
    () => {
      today.value = getToday(activeLanguage.value)
    }
)

/** Установить язык приложения */
const setActiveLanguage = (event: CustomEvent<{ activeLanguage: LanguagesEnum }>) => {
  activeLanguage.value = event.detail.activeLanguage
}

/** Получить актуальное время */
const getTime = () => currentTime.value = getCurrentTime()

/** Подписка на изменения языка приложения */
document.addEventListener('set-active-language', setActiveLanguage)
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

.info__map {
  align-self: flex-end;
}
</style>
