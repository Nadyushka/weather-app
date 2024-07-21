import {
	dayLongNamesDe,
    dayLongNamesBy,
    dayLongNamesEn,
    dayLongNamesRu,
	 dayShortNamesDe,
    dayShortNamesBy,
    dayShortNamesEn,
    dayShortNamesRu,
	 monthNamesDe,
    monthNamesBy,
    monthNamesEn,
    monthNamesRu
} from "@/shared";
import {DateModel, LanguagesEnum} from "@/pages";

export const  getCurrentTime = () => {
    const dayToday = new Date()
    const hours = dayToday.getHours().toString().padStart(2, '0')
    const minutes = dayToday.getMinutes().toString().padStart(2, '0')
    const seconds = dayToday.getSeconds().toString().padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}

export const getToday = (language: LanguagesEnum): DateModel => {
    const dayToday = new Date()
    const dayOfWeekNumber = dayToday.getDay()
    const monthNumber = dayToday.getMonth()

    switch (language) {
        case LanguagesEnum.Russian: {
            return new DateModel({
                DayOfWeek: dayShortNamesRu[dayOfWeekNumber],
                Month: monthNamesRu[monthNumber],
                Day: dayToday.getDate()
            })
        }
        case LanguagesEnum.English: {
            return new DateModel({
                DayOfWeek: dayShortNamesEn[dayOfWeekNumber],
                Month: monthNamesEn[monthNumber],
                Day: dayToday.getDate()
            })
        }
        case LanguagesEnum.Deutsch: {
            return new DateModel({
                DayOfWeek: dayShortNamesDe[dayOfWeekNumber],
                Month: monthNamesDe[monthNumber],
                Day: dayToday.getDate()
            })
        }
    }
}

export const getLongDayOfWeek = (language: LanguagesEnum, idx: number): string => {
    const todayDayOfWeek = new Date().getDay()
    const nextDayValue =  (todayDayOfWeek + idx + 1) % 7


    switch (language) {
        case LanguagesEnum.Russian: {
            return dayLongNamesRu[nextDayValue]
        }
        case LanguagesEnum.English: {
            return dayLongNamesEn[nextDayValue]
        }
        case LanguagesEnum.Deutsch: {
            return dayLongNamesDe[nextDayValue]
        }
    }
}
