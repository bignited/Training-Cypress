import { format } from "date-fns"

export type Course = {
    id: number,
    name: string,
    description: string,
    type: Types,
    image: string
    location: Locations,
    date: string,
    timeStart: string,
    timeEnd: string,
    teacher: string,
    contactEmail: string,
    contactPhone: string
}

export enum Locations {
     Antwerpen = 'Antwerpen', 
     Leuven = 'Leuven', 
     Brussels = 'Brussels', 
     Gent = 'Gent'
}

export enum Types {
    Workshop = 'Workshop',
    HandsOn = 'Hands on', 
    Discussion = 'Discussion', 
    Theory = 'Theory'
}

const dateToday = new Date()
export const date = (addedDays = 0, formatString: string = 'yyyy-MM-dd') => format(dateToday.setDate(dateToday.getDate() + addedDays), formatString)
export const startTime = (addedMinutes = 0) => format(dateToday.setMinutes(dateToday.getMinutes() + addedMinutes), 'HH:mm')
export const endTime = (addedMinutes = 0) => format(dateToday.setMinutes(dateToday.getMinutes()+ addedMinutes), 'HH:mm')

export const cypressCourse : Course = {
    id: 1,
    name: 'Cypress',
    description: 'This is a beginners course for cypress - This is created in the Training application',
    location: Locations.Antwerpen,
    teacher: 'Zuko',
    date: date(),
    timeStart: startTime(),
    timeEnd: endTime(45),
    image: './cypress/media/cypress.png',
    type: Types.Workshop,
    contactEmail: 'zuko@atla.be',
    contactPhone: '+3246576586'
}

export const playwrightCourse: Course = {
    id: 2,
    name: 'Playwright',
    description: 'This is a beginners course for playwright - \n This is created in the Training application',
    location: Locations.Gent,
    teacher: 'Katara',
    date: date(),
    timeStart: startTime(),
    timeEnd: endTime(35),
    image: './cypress/media/playwright.png',
    type: Types.Theory,
    contactEmail: "katara@atla.be",
    contactPhone: "+3265478354"
}

export const gatlingCourse: Course = {
    id: 4,
    name: 'Gatling',
    description: 'This is a beginners course for gatling - \n This is created in the Training application',
    location: Locations.Leuven,
    teacher: 'Toph Beifong',
    date: date(),
    timeStart: startTime(10),
    timeEnd: endTime(20),
    image: './cypress/media/gatling.png',
    type: Types.Discussion,
    contactEmail: "toph.beifong@atla.be",
    contactPhone: "+3265465645646"
}