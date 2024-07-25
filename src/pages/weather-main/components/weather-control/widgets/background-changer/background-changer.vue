<script setup lang="ts">
import RefreshSvg from "@/assets/images/svg/refresh.svg"
import {ref} from "vue";

/** Активна ли анимация вращения */
const isSpinAnimationActive = ref(false)

/** Tаймер для анимации */
let spinTimer

/**
 * Переключатель анимации
 * @param value
 */
const toggleAnimation = (value: boolean) => isSpinAnimationActive.value = value
/**
 * * Переключить фоновую картинку
 */
const changeBackgroundImage = () => {
  if (spinTimer) {
    clearTimeout(spinTimer)
  }

  toggleAnimation(true)
  spinTimer = setTimeout(() => toggleAnimation(false),1000)
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
  transition: 0.5s all;
}

.changer:hover {
  background-color: var(--bg-color-hover);
}

@keyframes rotate360 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.changer__svg_spin {
  animation: rotate360 1s linear infinite;
}
</style>
