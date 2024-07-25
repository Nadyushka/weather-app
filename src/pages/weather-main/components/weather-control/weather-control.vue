<script setup lang="ts">
import { BackgroundChanger, LanguageDropdown, TemperatureToggler, SearchInput, LanguagesEnum }
  from "@/pages";
import { provide, Ref, ref} from "vue";

/** Язык приложения */
const activeLanguage = ref<LanguagesEnum>( LanguagesEnum.English)

/** Передаем язык приложения  */
provide<Ref<LanguagesEnum>>('activeLanguage', activeLanguage)

/** Установить язык приложения */
const setActiveLanguage = (event: CustomEvent<{ activeLanguage: LanguagesEnum }>) => {
  activeLanguage.value = event.detail.activeLanguage
}

/** Подписка на изменения языка приложения */
document.addEventListener('set-active-language', setActiveLanguage)
</script>

<template>
<div class="control">
  <div class="settings">
    <background-changer/>
    <language-dropdown/>
    <temperature-toggler/>
  </div>
  <div class="search">
    <search-input/>
  </div>
</div>
</template>

<style scoped lang="scss">
.control {
  margin-bottom: 57px;
  display: flex;
  justify-content: space-between;
}

.settings {
  display: flex;
  gap: 10px;
}
</style>
