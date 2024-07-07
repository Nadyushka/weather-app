<script setup lang="ts">

import { BackgroundChanger, LanguageDropdown, TemperatureToggler, SearchInput }
  from "@/pages";

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
