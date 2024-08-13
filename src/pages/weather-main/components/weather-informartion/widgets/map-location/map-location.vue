<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import { computed, inject, nextTick, onMounted, Ref, ref, watch } from "vue";
import {AdapterService, LanguagesEnum} from "@/pages";
// import {MAP_API} from "@/../token.local";
import { translate } from "@/shared";

/** Сервис для уравления данными */
const adapterService = AdapterService.getInstance();

const map = ref<mapboxgl.Map | null>(null);
const marker = ref<mapboxgl.Marker | null>(null);

/** Переданный язык приложения */
const language = inject<Ref<LanguagesEnum>>("activeLanguage");

/** Язык приложения */
const activeLanguage = computed(() => language.value ?? LanguagesEnum.English);

/** Широта */
const shownLatitude = computed(() =>
    `${adapterService.Latitude.value?.slice(0, 2)}°${adapterService.Latitude.value?.slice(3, 5)}'`
);
/** Долгота */
const shownLongitude = computed(() =>
    `${adapterService.Longitude.value?.slice(0, 2)}°${adapterService.Longitude.value?.slice(3, 5)}'`
);

/** Подписка на изменение геоданных для обновления карты */
watch(
  () => [adapterService.Latitude.value, adapterService.Longitude.value],
  () => updateMap()
);

/** После монтирования компонента */
onMounted(async () => {
  await nextTick();
  initMap();
});

/** Инициализировать карту */
const initMap = () => {
  console.log(process.env.MAP_API)
  mapboxgl.accessToken =  process.env;
  map.value = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [+adapterService.Longitude.value, +adapterService.Latitude.value],
    zoom: 12,
    language: LanguagesEnum.English,
  });

  marker.value = new mapboxgl.Marker()
    .setLngLat([
      +adapterService.Longitude.value,
      +adapterService.Latitude.value,
    ])
    .addTo(map.value);

  updateMap();
};

/** Актуализировать карту */
const updateMap = () => {
  if (map.value && marker.value) {
    map.value.setCenter([
      +adapterService.Longitude.value,
      +adapterService.Latitude.value,
    ]);
    marker.value.setLngLat([
      +adapterService.Longitude.value,
      +adapterService.Latitude.value,
    ]);
  }
};

</script>

<template>
  <div class="location">
    <div class="location__map">
      <div id="map" class="location__map" />
    </div>
    <div class="location__latitude-longitude">
      <div class="location__latitude">
        {{ translate.Latitude[activeLanguage] }}: {{ shownLatitude }}
      </div>
      <div class="location__longitude">
        {{ translate.Longitude[activeLanguage] }}: {{ shownLongitude }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.location__map {
  overflow: hidden;
  width: 375px;
  height: 398px;
  margin-bottom: 24px;
  border-radius: 24px;
}

.location__latitude,
.location__longitude {
  font-size: 20px;
  font-weight: var(--fw-semiBold);
  font-family: "Montserrat-SemiBold", sans-serif;
  color: var(--font-color-main);
  text-align: right;
}

.location__latitude {
  margin-bottom: 8px;
}
</style>
