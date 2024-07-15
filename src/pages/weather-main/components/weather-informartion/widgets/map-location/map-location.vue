<script setup lang="ts">

import mapboxgl from 'mapbox-gl';


import {onMounted, ref} from "vue";

const map = ref<mapboxgl.Map | null>(null)

onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmFkemV5YS1iYXJhbmF2YSIsImEiOiJjbHluYXcybmUwM3o2MmpzNHB4MnhldDh5In0.GufKW2_OnKORkepYmUENGQ'
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [27.5667, 53.9000], // Координаты Минска
    zoom: 12,
    language: 'en'
  })

  new mapboxgl.Marker()
      .setLngLat([27.5667, 53.9000]) // Координаты Минска
      .addTo(map.value)
})
</script>

<template>
<div class="location">
  <div class="location__map">
    <div id="map" class="location__map"/>
</div>
  <div class="location__latitude-longitude">
    <div class="location__latitude">Latitude: {{ 27.5667}}</div>
    <div class="location__longitude">Longitude: {{ 53.9000 }}</div>
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
