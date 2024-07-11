<script setup lang="ts">
import {LocationDate, WeatherInfo, WeatherForecast, MapLocation, DateModel, LocationModel} from "@/pages";
import {onMounted, ref} from "vue";
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

/**
 * * После монтирования компонента
 */
onMounted(() => {
  currentTime.value = getCurrentTime()
  today.value = getToday('en')

  setInterval(() => currentTime.value = getCurrentTime() , 1000)
})

</script>

<template>
  <div class="info">
    <div class="info__weather">
      <location-date :currenTime="currentTime" :today="today" :location="location"/>
      <weather-info/>
      <weather-forecast/>
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
