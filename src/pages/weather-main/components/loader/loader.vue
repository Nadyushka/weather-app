<script setup lang="ts"></script>

<template>
  <div class="loader__wrapper">
    <div class="loader">
      <div class="dot-left" />
      <div class="dot-center" />
      <div class="dot-right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader__wrapper {
  position: fixed;
  width: 100vw;
  min-height: 100dvh;
  text-align: center;
  background-image: linear-gradient(
    to bottom,
    rgba(8, 15, 26, 0.9) 0%,
    rgba(17, 17, 46, 0.9) 100%
  );
  color: var(--font-color-main);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot-left,
.dot-right,
.dot-center {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--font-color-main);
  margin: 0 5px;
}

.dot-left {
  animation: pulseSide 1s infinite ease-in-out;
}

.dot-right {
  animation: pulseSide 1s infinite ease-in-out;
}

.dot-center {
  animation: pulseCenter 1s infinite ease-in-out;
  animation-delay: 0.3s;
}

@keyframes pulseSide {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0.8);
  }
}

@keyframes pulseCenter {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
