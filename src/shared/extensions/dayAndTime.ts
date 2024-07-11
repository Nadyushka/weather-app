import {dayShortNamesBy, dayShortNamesEn, dayShortNamesRu, monthNamesBy, monthNamesEn, monthNamesRu} from "@/shared";
import {DateModel} from "@/pages";

export const  getCurrentTime = () => {
    const dayToday = new Date()
    const hours = dayToday.getHours().toString().padStart(2, '0')
    const minutes = dayToday.getMinutes().toString().padStart(2, '0')
    const seconds = dayToday.getSeconds().toString().padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}

export const getToday = (language: 'ru' | 'en' | 'by'): DateModel => {
    const dayToday = new Date()
    const dayOfWeekNumber = dayToday.getDay()
    const monthNumber = dayToday.getMonth()

    switch (language) {
        case 'ru': {
            return new DateModel({
                DayOfWeek: dayShortNamesRu[dayOfWeekNumber],
                Month: monthNamesRu[monthNumber],
                Day: dayToday.getDate()
            })
        }
        case 'en': {
            return new DateModel({
                DayOfWeek: dayShortNamesEn[dayOfWeekNumber],
                Month: monthNamesEn[monthNumber],
                Day: dayToday.getDate()
            })
        }
        case 'by': {
            return new DateModel({
                DayOfWeek: dayShortNamesBy[dayOfWeekNumber],
                Month: monthNamesBy[monthNumber],
                Day: dayToday.getDate()
            })
        }
    }
}
