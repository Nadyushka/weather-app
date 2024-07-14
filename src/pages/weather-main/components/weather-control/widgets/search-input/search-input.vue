<script setup lang="ts">
import MicrophoneSvg from "@/assets/images/svg/microphone-svg.svg"
import {computed, inject, provide, Ref, ref, watch} from "vue";

/** Значение города для поиска погоды */
const searchValue = ref()

const translate = {
  Placeholder: {
    en: 'Search city or ZIP',
    ru: 'Искать город или индекс',
    by: 'Пошук горада або індэкс'
  },
  ButtonText: {
    en: 'SEARCH',
    ru: 'ИСКАТЬ',
    by: 'ПОШУК'
  },
}

const language = inject<Ref<'en' | 'ru' | 'by'>>('activeLanguage')

const activeLanguage = computed(() => language.value ?? 'en')

</script>

<template>
  <div class="input">
    <div class="input__wrapper">
      <input v-model="searchValue" class="input__body" :placeholder="translate.Placeholder[activeLanguage]"/>
      <MicrophoneSvg class="input__microphone"/>
    </div>
    <button class="input__button"> {{translate.ButtonText[activeLanguage]}} </button>
  </div>
</template>

<style scoped lang="scss">
.input {
  display: flex;
}

.input__wrapper {
  position: relative;
}

.input__body {
  padding: 14px 15px;
  height: 44px;
  width: 274px;
  background-color: var(--btn-background-disabled);
  border-radius: 4px 0 0 4px;
  border: 1px solid rgba(228, 227, 227, 0.2);
  font-family: 'Montserrat-Regular', sans-serif;
  font-weight: var(--fw-regular);
  font-size: 14px;
  color: var(--font-color-main)
}

.input__body::placeholder {
  font-family: 'Montserrat-Regular', sans-serif;
  font-weight: var(--fw-regular);
  font-size: 14px;
  color: var(--font-color-main)
}

.input__microphone {
  position: absolute;
  top: 14px;
  right: 13px;
  cursor: pointer;
  transition: 0.5s all;
}

.input__microphone:hover {
  scale: 1.1;
}

.input__button {
  height: 44px;
  min-width: 101px;
  padding: 20px 15px;
  font-weight: var(--fw-bold);
  font-size: 14px;
  color: var(--font-color-main);
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--btn-background);
  border: none;
  outline: none;
  transition: 0.5s all;
  border-radius: 0 4px 4px 0;
}

.input__button:hover {
  background-color: var(--bg-color-hover);
}

.input__button:active {
  background-color: transparent;
}
</style>
