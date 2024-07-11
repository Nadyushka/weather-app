<script setup lang="ts">

import { DateModel, LocationModel } from "@/pages";
import {computed, PropType} from "vue";

const props = defineProps({
  /** Текущее время */
  currenTime: {
    type: String,
    required: true
  },
  /** Сегодняшний день */
  today: {
    type: Object as PropType<DateModel>,
    required: true
  },
  /** Местоположение пользователя */
  location: {
    type: Object as PropType<LocationModel>,
    required: true
  }
})

</script>

<template>
<div class="location">
  <div class="location__place">
    {{props.location.City}}, {{props.location.Country}}
  </div>
  <div class="location__date">
    <div class="location__day">{{ props.today.DayOfWeek}} {{ props.today.Day }} {{ props.today.Month }}</div>
    <div class="location__time">{{ props.currenTime }}</div>
  </div>
</div>
</template>

<style scoped lang="scss">
.location {
  margin-bottom: 96px;
}

.location__place {
  font-size: 44px;
  color: var(--font-color-main);
  font-family: 'Montserrat-Bold', sans-serif;
  font-weight: var(--fw-bold);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.location__date {
  font-size: 24px;
  display: flex;
  gap: 18px;
  font-family: 'Montserrat-SemiBold', sans-serif;
  font-weight: var(--fw-semiBold);
  color: var(--font-color-main);
}
</style>
