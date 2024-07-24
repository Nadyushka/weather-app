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

const adapterService = AdapterService.getInstance()

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
const location = computed(() =>
    new LocationModel({ Country: adapterService.Country.value, City: adapterService.City.value }))

let timer

/**
 * * После монтирования компонента
 */
onMounted(() => {
  getTime()
  today.value = getToday(LanguagesEnum.English)

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

const todayForecast = computed( () => adapterService.TodayForecast.value)

const futureForecast = computed( () => adapterService.FutureForecast.value)

const activeLanguage = ref<LanguagesEnum>(LanguagesEnum.English)

const setActiveLanguage = (event: CustomEvent<{ activeLanguage: LanguagesEnum }>) => {
  activeLanguage.value = event.detail.activeLanguage
}

document.addEventListener('set-active-language', setActiveLanguage)

provide<Ref<LanguagesEnum>>('activeLanguage', activeLanguage)

/** Подписка на изменение языка */
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

.info__map {
  align-self: flex-end;
}
</style>
