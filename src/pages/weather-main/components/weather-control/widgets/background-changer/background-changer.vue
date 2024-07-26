<script setup lang="ts">
import RefreshSvg from "@/assets/images/svg/refresh.svg"
import {nextTick, onMounted, ref} from "vue";
import {AdapterService} from "@/pages";

/** Сервис для уравления данными */
const adapterService = AdapterService.getInstance()

/** Активна ли анимация вращения */
const isSpinAnimationActive = ref(false)

onMounted(async () => await adapterService.getRandomImage())

/**
 * Переключатель анимации
 * @param value
 */
const toggleAnimation = (value: boolean) => isSpinAnimationActive.value = value
/**
 * * Переключить фоновую картинку
 */
const changeBackgroundImage = async () => {
  if (isSpinAnimationActive.value) return

  try {
    toggleAnimation(true)
    await adapterService.getRandomImage()
  } finally {
    toggleAnimation(false)
  }
}
</script>

<template>
<div class="changer" @click="changeBackgroundImage">
  <RefreshSvg class="changer__svg" :class="{'changer__svg_spin': isSpinAnimationActive}"/>
</div>
</template>

<style scoped lang="scss">
.changer {
  width: 44px;
  height: 44px;
  background-image: url("@/assets/images/png/refresh-bg.png");
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 1s ease;
}

.changer:hover {
  background-color: var(--bg-color-hover);
}

.changer__svg_spin {
  transform-origin: center center;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
