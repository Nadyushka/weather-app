<script setup lang="ts">

import { LocationDate, WeatherInfo, WeatherForecast, MapLocation } from "@/pages";
import {dayShortNamesBy, dayShortNamesEn, dayShortNamesRu, monthNamesBy, monthNamesEn, monthNamesRu} from "@/shared";

class LocationDataModel {
  private _Language: 'ru' | 'en' | 'by' = 'ru';
  private _MonthNames: string[];
  private _DayShortNames: string[];
  private _Today: Date = new Date();

  get Language(): 'ru' | 'en' | 'by' {
    return this._Language;
  }

  set Language(lang: 'ru' | 'en' | 'by') {
    this._Language = lang;
    this.updateLanguageData();
  }

  get Date(): string {
    const currentDate = this._Today.getDate().toString().padStart(2, '0');
    const dayOfWeek = this._DayShortNames[this._Today.getDay()];
    const currentMonth = this._MonthNames[this._Today.getMonth()];
    return `${dayOfWeek} ${currentDate}  ${currentMonth}`;
  }

  private _City!: string;
  private _Country!: string;

  get City(): string {
    return this._City;
  }

  set City(city: string) {
    this._City = city;
  }

  get Country(): string {
    return this._Country;
  }

  set Country(country: string) {
    this._Country = country;
  }

  private updateLanguageData() {
    switch (this._Language) {
      case 'ru':
        this._MonthNames = monthNamesRu;
        this._DayShortNames = dayShortNamesRu;
        break;
      case 'en':
        this._MonthNames = monthNamesEn;
        this._DayShortNames = dayShortNamesEn;
        break;
      case 'by':
        this._MonthNames = monthNamesBy;
        this._DayShortNames = dayShortNamesBy;
        break;
    }
  }

  constructor(obj?: Partial<LocationDataModel>) {
    Object.assign(this, obj);
    this.updateLanguageData();
  }
}

const locationData = new LocationDataModel()
</script>

<template>
  <div class="info">
    <div class="info__weather">
      <location-date/>
      <weather-info/>
      <weather-forecast/>
    </div>
    <div class="info__map">
      <map-location/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info {
  display: flex;
  justify-content: space-between;
}
</style>
