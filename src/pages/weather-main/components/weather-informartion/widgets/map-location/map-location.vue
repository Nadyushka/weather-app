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
