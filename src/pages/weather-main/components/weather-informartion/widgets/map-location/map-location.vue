<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import { computed, inject, nextTick, onMounted, Ref, ref, watch } from "vue";
import {AdapterService, LanguagesEnum} from "@/pages";
import {MAP_API} from "../../../../../../../token.local";

const adapterService = AdapterService.getInstance();

const map = ref<mapboxgl.Map | null>(null);
const marker = ref<mapboxgl.Marker | null>(null);

onMounted(async () => {
  await nextTick();
  initMap();
});

/** Подписка на изменение геоданных для обновления карты */
watch(
  () => [adapterService.Latitude.value, adapterService.Longitude.value],
  () => {
    updateMap();
  }
);

/** Инициализировать карту */
const initMap = () => {
  mapboxgl.accessToken = location.href.includes('localhost') ? MAP_API :  process.env.MAP_API;
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

/** Широта */
const shownLatitude = computed(() =>
  `${adapterService.Latitude.value?.slice(
        0,
        2
      )}°${adapterService.Latitude.value?.slice(3, 5)}'`
);
/** Долгота */
const shownLongitude = computed(() =>
   `${adapterService.Longitude.value?.slice(
        0,
        2
      )}°${adapterService.Longitude.value?.slice(3, 5)}'`
);

const translate = {
  Latitude: {
    en: "Latitude",
    ru: "Широта",
    by: "Шырата",
	 de: "Breitengrad"
  },
  Longitude: {
    en: "Longitude",
    ru: "Долгота",
    by: "Даўгата",
	 de: "Längengrad"
  },
};

const language = inject<Ref<LanguagesEnum>>("activeLanguage");
const activeLanguage = computed(() => language.value ?? LanguagesEnum.English);
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
  clip-path: polygon(0.057% 41.128%, 0.057% 41.128%, 0.108% 55%, 0.295% 66.352%, 0.731% 75.458%, 1.528% 82.59%, 2.798% 88.021%, 4.652% 92.023%, 7.204% 94.87%, 10.564% 96.833%, 14.845% 98.185%, 20.16% 99.199%, 20.16% 99.199%, 25.031% 99.696%, 31.555% 99.954%, 39.292% 99.986%, 47.801% 99.806%, 56.639% 99.426%, 65.366% 98.859%, 73.541% 98.119%, 80.722% 97.22%, 86.467% 96.173%, 90.337% 94.993%, 90.337% 94.993%, 92.526% 93.464%, 94.366% 91.051%, 95.886% 87.834%, 97.112% 83.896%, 98.074% 79.318%, 98.798% 74.182%, 99.313% 68.569%, 99.646% 62.562%, 99.825% 56.241%, 99.879% 49.689%, 99.879% 49.689%, 99.869% 43.063%, 99.8% 36.579%, 99.612% 30.35%, 99.242% 24.487%, 98.632% 19.104%, 97.72% 14.312%, 96.445% 10.224%, 94.748% 6.951%, 92.568% 4.607%, 89.843% 3.304%, 89.843% 3.304%, 83.476% 2.09%, 75.518% 1.137%, 66.427% 0.462%, 56.664% 0.082%, 46.688% 0.013%, 36.959% 0.274%, 27.937% 0.88%, 20.081% 1.849%, 13.851% 3.198%, 9.707% 4.944%, 9.707% 4.944%, 7.304% 6.924%, 5.331% 9.356%, 3.748% 12.209%, 2.513% 15.448%, 1.583% 19.039%, 0.917% 22.951%, 0.473% 27.149%, 0.21% 31.6%, 0.085% 36.271%, 0.057% 41.128%);
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
