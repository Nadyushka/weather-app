<script lang="ts" setup>
import { AdapterService, WeatherControl, WeatherInformation, Loader } from "@/pages";
import {computed, onBeforeMount, toRefs, watch} from "vue";

/** Сервис для уравления данными */
const adapterService = AdapterService.getInstance();

/** Индикатор загрузки */
const isLoading = computed(() => adapterService.IsLoading.value);
/** Рандомная картинка для фона */
const backgroundImage = computed(() => adapterService.BackgroundImage.value);

/** До монтирования компонента */
onBeforeMount(async () => {
  await adapterService.getLocation();
});
</script>

<template>
  <Loader v-if="isLoading"/>

  <main class="content" :style="{ backgroundImage: backgroundImage }">
    <div class="content__background_transparent">
      <div class="content__wrapper">
        <weather-control />
        <weather-information />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.content {
  width: 100vw;
  min-height: 100dvh;
  height: 100%;
  background-size: cover;
}

.content__background_transparent {
  width: 100vw;
  min-height: 100dvh;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(8, 15, 26, 0.59) 0%,
    rgba(17, 17, 46, 0.46) 100%
  );
}

.content__wrapper {
  padding: 40px 90px 96px;
}
</style>
