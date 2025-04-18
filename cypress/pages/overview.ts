import { Course, cypressCourse, Locations, Types } from "../fixtures/course"

export const overview = {
    button: {
        enroll: '#enroll-button',
        enrolled: '#enrolled-button',
        create: '#create-course-button',
        enrollIntoCourse: (name: string) => `#${name.toLocaleLowerCase()}-course-button`
    },
    card: {
        course: (name: string) => `#enroll-${name}`,
        content: (attribute: string) => `#course-${attribute}`
    },
    alert: (type: string) => `#${type}-alert`
}

export const contentShouldContainValue = (course: Course, attribute: string, value : string | Locations | Types = course[attribute]) => {
    cy.get(overview.card.course(course.name)).within(() => overview.card.content(attribute)).within(() => {
        return cy.get('p').should('contain', value)
    })
}

