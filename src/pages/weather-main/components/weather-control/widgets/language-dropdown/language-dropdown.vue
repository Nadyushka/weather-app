<script setup lang="ts">
import DropdownArrow from "@/assets/images/svg/dropdown-arrow.svg"

import {ref} from "vue";
import {
  LangOptionModel
} from "./models";
import {AdapterService, LanguagesEnum} from "@/pages";

/** Сервис для уравления данными */
const adapterService = AdapterService.getInstance()

/** Варианты выбора языка в дропдауне */
const langOptions:LangOptionModel[]  = [
  new LangOptionModel({Id: 0, Language: LanguagesEnum.English}),
  new LangOptionModel({Id: 1, Language: LanguagesEnum.Russian }),
  new LangOptionModel({Id: 2, Language: LanguagesEnum.Deutsch })
]

/** Видны ли опции для выбора дропдауна */
const isOptionsVisible = ref(false)
/** Язык приложения */
const activeLanguage = ref<LanguagesEnum>(LanguagesEnum.English)

/**
 * Выбрать язык приложения
 * @param value
 */
const setActiveLanguage = async (value: LanguagesEnum) => {
  activeLanguage.value = value
  document.dispatchEvent(new CustomEvent(
      'set-active-language', {
      detail: {
        activeLanguage: value
  }
      })
)
  adapterService.CurrentLanguage = value
}
/**
 * * Переключатель видимости дропдауна
 */
const toggleOptionsVisibility = (value: boolean) => {
  isOptionsVisible.value = value
  if (value) {
    document.addEventListener('click', closeMenuOnClickOutside)
  } else {
    document.removeEventListener('click', closeMenuOnClickOutside)
  }
}
/**
 * Закрыть дропдаун при клике вне дропдауна
 * @param event
 */
const closeMenuOnClickOutside = (event) => {
  if (isOptionsVisible.value && event.target.closest('.dropdown')) return

  if (isOptionsVisible.value && !event.target.closest('.dropdown')) {
    isOptionsVisible.value = false
    document.removeEventListener('click', closeMenuOnClickOutside)
  }
}
</script>

<template>
  <div class="dropdown">
    <div class="dropdown__value" @click="toggleOptionsVisibility(!isOptionsVisible)">
      <div class="dropdown__language"> {{ activeLanguage }}</div>
      <DropdownArrow class="dropdown__icon" :class="[isOptionsVisible ? 'dropdown__icon_open' : 'dropdown__icon_close']"/>
    </div>
    <div class="dropdown__options" :class="{'dropdown__options_visible': isOptionsVisible}">
      <div
          v-for="langOption in langOptions"
          class="dropdown__option"
          :class="{'dropdown__option_active': langOption.Language ==  activeLanguage}"
          @click="setActiveLanguage(langOption.Language)"
      >
        {{ langOption.Language}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown{
  position: relative;
  font-size: 14px;
  font-weight: var(--fw-bold);
  color: var(--font-color-main);
}
.dropdown__value {
  width: 71px;
  height: 44px;
  display: flex;
  border-radius: 4px;
  background-color: var(--btn-background);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.5s all;
}

.dropdown__value:hover{
  background-color: var(--bg-color-hover);
}

.dropdown__language {
  margin-right: 6px;
}

.dropdown__options {
  height: 0;
  width: 0;
  opacity: 0;
  position: absolute;
  top: 50px;
  border-radius: 4px;
  overflow: hidden;
  transition: 0.4s height;
}

.dropdown__options_visible {
  width: 71px;
  height: 132px;
  opacity: 1;
  transition: 0.4s height;
}

.dropdown__option {
  width: 71px;
  height: 44px;
  cursor: pointer;
  background-color: rgba(76, 82, 85) ;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s all;
}

.dropdown__option_active,
.dropdown__option:hover {
  background-color: rgba(174, 181, 185);
}

.dropdown__icon {
  transition: transform 0.5s;
}

.dropdown__icon_open {
  transform: rotate(180deg);
}

.dropdown__icon_close {
  transform: rotate(0deg);
}
</style>
