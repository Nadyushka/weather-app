<script setup lang="ts">

import mapboxgl from 'mapbox-gl';

import {computed, inject, nextTick, onMounted, Ref, ref, watch} from "vue";
import {AdapterService} from "@/pages";

const adapterService = AdapterService.getInstance()

const map = ref<mapboxgl.Map | null>(null)

/** Подписка на изменение геоданных для обновления карты*/
watch(
    () => [adapterService.Latitude.value, adapterService.Longitude.value],
    () =>  updateMap()
)
/** Актуализировать карту */
const updateMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmFkemV5YS1iYXJhbmF2YSIsImEiOiJjbHluYXcybmUwM3o2MmpzNHB4MnhldDh5In0.GufKW2_OnKORkepYmUENGQ'
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [adapterService.Longitude.value, adapterService.Latitude.value ], // Координаты Минска
    zoom: 12,
    language: 'en'
  })

  new mapboxgl.Marker()
      .setLngLat([ adapterService.Latitude.value, adapterService.Longitude.value])
      .addTo(map.value)
}

/** Широта */
const shownLatitude = computed(() =>
    adapterService.Latitude.value ? `${adapterService.Latitude.value?.slice(0, 2)}°${adapterService.Latitude.value?.slice(3, 5)}'` : `0°0'`)
/** Долгота */
const shownLongitude = computed(() =>
    adapterService.Latitude.value ? `${adapterService.Longitude.value?.slice(0, 2)}°${adapterService.Longitude.value?.slice(3, 5)}'` : `0°0'`)

const translate = {
  Latitude: {
    en: 'Latitude',
    ru: 'Широта',
    by: 'Шырата'
  },
  Longitude: {
    en: 'Longitude',
    ru: 'Долгота',
    by: 'Даўгата'
  },
}

const language = inject<Ref<'en' | 'ru' | 'by'>>('activeLanguage')

const activeLanguage = computed(() => language.value ?? 'en')
</script>

<template>
<div class="location">
  <div class="location__map">
    <div id="map" class="location__map"/>
</div>
  <div class="location__latitude-longitude">
    <div class="location__latitude"> {{ translate.Latitude[activeLanguage] }}: {{ shownLatitude }} </div>
    <div class="location__longitude"> {{ translate.Longitude[activeLanguage] }}: {{ shownLongitude }} </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.location__map {
  border-radius: 24px;
  overflow: hidden;
  width: 375px;
  height: 398px;
  margin-bottom: 24px;
}

.location__latitude,
.location__longitude {
font-size: 20px;
  font-weight: var(--fw-semiBold);
  font-family: 'Montserrat-SemiBold', sans-serif;
  color: var(--font-color-main);
  text-align: right;
}

.location__latitude {
  margin-bottom: 8px;
}
</style>
