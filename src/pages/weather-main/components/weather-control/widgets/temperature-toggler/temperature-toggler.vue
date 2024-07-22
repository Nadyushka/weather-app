<script setup lang="ts">
import {ref, watch} from "vue";
import {
  TemperatureTypeModel
} from "./models";
import {AdapterService} from "@/pages";

const adapterService = AdapterService.getInstance()

/**
 * * Вмды температур
 */
const temperatureTypes:TemperatureTypeModel[] = [
    new TemperatureTypeModel ({Type: 'F', ShownType: '°F'}),
    new TemperatureTypeModel ({Type: 'C', ShownType: '°C'})
]

/**
 * * Выбранный тип температуры
 */
const activeTemperatureType = ref<'C' | 'F'>( 'C')

/**
 * * Для смены типа температуры
 */
const changeTemperatureType = (newType: 'C' | 'F') => {
  if (activeTemperatureType.value == newType) return

  activeTemperatureType.value = newType
  adapterService.TemperatureType = newType
}
</script>

<template>
  <div class="temperature">
    <div
        v-for="temperature in temperatureTypes"
        class="temperature__type"
         :class="{
          'temperature__type_active': temperature.Type === activeTemperatureType
           }"
        @click="changeTemperatureType(temperature.Type)"
    >
    {{ temperature.ShownType }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.temperature {
  border-radius: 4px;
  display: flex;
  overflow: hidden;
}

.temperature__type {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
}

.temperature__type {
  background-color: var(--btn-background-disabled);
  font-weight: var(--fw-bold);
  font-size: 14px;
  color: var(--font-color-disabled);
  font-family: 'Montserrat-Bold', sans-serif;
  cursor: pointer;
  transition: 0.5s all;
}

.temperature__type:hover {
  background-color: var(--bg-color-hover);
}

.temperature__type_active {
  background-color: var(--btn-background);
  color: var(--font-color-main);
}

.temperature__type_active:hover {
  background-color: var(--bg-color-hover);
}
</style>
