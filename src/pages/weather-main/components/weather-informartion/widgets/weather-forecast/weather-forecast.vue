<script setup lang="ts">
import { computed, PropType, ref, inject, Ref } from "vue";
import {
  FutureWeatherForecastModel,
  WeatherForecastModel,
  LanguagesEnum,
} from "@/pages";
import CircleSvg from "@/assets/images/svg/circle.svg";
import { getLongDayOfWeek } from "@/shared";
import {AdapterService} from "@/pages";

const adapterService = AdapterService.getInstance()

const translate = {
  Feelslike: {
    en: "Feels like",
    ru: "Ощущается",
    by: "Адчуваецца",
    de: "Fühlt sich an wie",
  },
  Wind: {
    en: "Wind",
    ru: "Ветер",
    by: "Вецер",
    de: "Wind",
  },
  WindSpeed: {
    en: "m/s",
    ru: "м/с",
    by: "m/s",
    de: "m/s",
  },
  Humidity: {
    en: "Humidity",
    ru: "Влажность",
    by: "Вільготнасць",
    de: "Feuchtigkeit",
  },
};

/**
 * * Входящие пропсы
 */
const props = defineProps({
  todayForecast: {
    type: Object as PropType<WeatherForecastModel>,
    required: true,
  },
  futureForecast: {
    type: Array as PropType<WeatherForecastModel[]>,
    required: true,
  },
});

const futureForecastWithDayOfWeek = computed<FutureWeatherForecastModel>(() => {
  return props.futureForecast.map(
    (day, idx) =>
      new FutureWeatherForecastModel({
        ...day,
        DayOfWeek: getLongDayOfWeek(activeLanguage.value, idx),
      })
  );
});

const language = inject<Ref<LanguagesEnum>>("activeLanguage");

const activeLanguage = computed(() => language.value ?? LanguagesEnum.English);

const temperatureType = computed(() => adapterService.TemperatureType)
</script>

<template>
  <div class="forecast">
    <div class="forecast__today">
      <div class="forecast__today-temperature">
        {{ props.todayForecast.Temperature }}
      </div>
      <div class="forecast__today-weather">
        <div class="forecast__item">
          {{ props.todayForecast.WeatherDescription }}
        </div>
        <div class="forecast__item">
          {{ translate.Feelslike[activeLanguage] }}:
          {{ props.todayForecast.Feelslike }} °{{temperatureType}}
        </div>
        <div class="forecast__item">
          {{ translate.Wind[activeLanguage] }}:
          {{ props.todayForecast.Wind + ' ' + translate.WindSpeed[activeLanguage] }}
        </div>
        <div class="forecast__item">
          {{ translate.Humidity[activeLanguage] }}:
          {{ props.todayForecast.Humidity }}
        </div>
      </div>
      <img
        :src="props.todayForecast.WeatherIcon"
        alt="weather-icon"
        class="forecast__today-weather-icon"
      />
    </div>
    <div class="forecast__future">
      <div
        v-for="dayWeather in futureForecastWithDayOfWeek"
        class="forecast__day"
      >
        <div class="forecast__day-of-week">{{ dayWeather.DayOfWeek }}</div>
        <div class="forecast__day-of-week-weather">
          <div class="forecast__day-of-week-temperature">
            {{ dayWeather.Temperature }}
          </div>
          <img
            :src="dayWeather.WeatherIcon"
            alt="weather-icon"
            class="forecast__day-of-week-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.forecast {
  width: 730px;
}

.forecast__today {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  margin-bottom: 16px;
}

.forecast__today-weather-circle {
  position: absolute;
  top: 75px;
  z-index: 10;
  right: 300px;
}

.forecast__today-temperature {
  font-size: 306px;
  font-weight: var(--fw-bold);
  color: var(--font-color-main);
  font-family: "Montserrat-Bold", sans-serif;
  line-height: 1;
}

.forecast__today-weather-icon {
  position: absolute;
  top: 0;
  right: 90px;
  z-index: 5;
  width: 163px;
  height: 103px;
  scale: 2;
}

.forecast__today-weather {
  padding-top: 150px;
}

.forecast__item {
  text-transform: uppercase;
  font-size: 22px;
  font-weight: var(--fw-bold);
  color: var(--font-color-main);
  font-family: "Montserrat-Bold", sans-serif;
  line-height: 137%;
}

.forecast__future {
  display: flex;
  justify-content: space-between;
}

.forecast__day-of-week {
  text-transform: uppercase;
  font-size: 22px;
  font-weight: var(--fw-bold);
  color: var(--font-color-main);
  font-family: "Montserrat-Bold", sans-serif;
}

.forecast__day-of-week-weather {
  display: flex;
  align-items: flex-start;
}

.forecast__day-of-week-temperature {
  text-transform: uppercase;
  font-size: 80px;
  font-weight: var(--fw-semiBold);
  color: var(--font-color-main);
  font-family: "Montserrat-SemiBold", sans-serif;
}

.forecast__day-of-week-icon {
  width: 68px;
  height: 44px;
  scale: 1.25;
}
</style>
