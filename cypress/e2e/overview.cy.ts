import { Course, Locations, startTime, endTime, cypressCourse, date, Types, playwrightCourse, gatlingCourse, jestCourse } from "../fixtures/course"
import { validUser } from "../fixtures/user"
import { contentShouldContainValue, overview } from "../pages/overview"

const courses = [cypressCourse, playwrightCourse, jestCourse]

describe('OVERVIEW PAGE | ', () => {
    beforeEach(() => {
        cy.visit('/', {
            onBeforeLoad(win) {
                win.sessionStorage.setItem('courseArray', JSON.stringify(courses))
            },
        })
        cy.login(validUser.username, validUser.password)
    })

    it(`Should be able to intercept course GET - ${cypressCourse.name}`, () => {

        cy.intercept('GET', '/courses', (req) => {
            req.reply({
                statusCode: 200,
                body: [gatlingCourse]
            })
        }).as("getCourses")

        cy.get(overview.button.create).click()
        cy.createCourse(cypressCourse)

        cy.wait('@getCourses').then((interception) => expect(interception.response?.body[0].name).to.eq(gatlingCourse.name) )
    })

    it(`Should be able to see image of ${gatlingCourse.name} course`, () => {
        cy.get(overview.button.create).click()
        cy.createCourse(gatlingCourse)

        cy.get(overview.card.course(gatlingCourse.name)).within(() => overview.card.content('image')).should('be.visible')
    })

    it(`Should be able to enroll in to ${cypressCourse.name}`, () => {
        cy.get(overview.button.enrollIntoCourse(cypressCourse.name)).click()

        cy.get(overview.alert('success')).should('be.visible')
        cy.get(overview.button.enrollIntoCourse(cypressCourse.name)).should('be.disabled')
        cy.get(overview.button.enrollIntoCourse(cypressCourse.name)).should('contain.text', 'Already Enrolled')
    })

    it(`Should not be able to enroll in to ${playwrightCourse.name} and ${cypressCourse.name} because of a overlap`, () => {
        cy.get(overview.button.enrollIntoCourse(cypressCourse.name)).click()
        cy.get(overview.button.enrollIntoCourse(playwrightCourse.name)).click()

        cy.get(overview.alert('error')).should('be.visible')
        cy.get(overview.button.enrollIntoCourse(cypressCourse.name)).should('be.visible')
    })

    const attributes = ['teacher', 'location', 'type']

    courses.forEach((course) => {
        describe(`content of ${course.name}`, () => {

            it(`Should be able to see enrolled course - ${course.name}`, () => {
                cy.get(overview.card.course(course.name)).should('be.visible')
            })

            attributes.forEach((attribute) => {
                it(`Should be able to see ${attribute} of enrolled course`, () => {
                    cy.get(overview.card.course(course.name)).within(() => overview.card.content(attribute)).should('be.visible')
                })

                it(`Should contain ${course[attribute]} information of ${attribute} of enrolled course`, () => {
                    contentShouldContainValue(course, attribute)
                })
            })

            it(`Should be able to see date of enrolled course`, () => {
                cy.get(overview.card.course(course.name)).within(() => overview.card.content('date')).should('be.visible')
            })

            it(`Should contain ${date(0, 'dd-MM-yyyy')} information of date of enrolled course`, () => {
                contentShouldContainValue(course, 'date', date(0, 'dd-MM-yyyy'))
            })

            it(`Should be able to see time of enrolled course`, () => {
                cy.get(overview.card.course(course.name)).within(() => overview.card.content('time')).should('be.visible')
            })

            it(`Should contain ${course.timeStart} - ${course.timeEnd} information of time of enrolled course`, () => {
                contentShouldContainValue(course, 'time', `${course.timeStart} - ${course.timeEnd}`)
            })

            it(`Should be able to see phone of enrolled course`, () => {
                cy.get(overview.card.course(course.name)).within(() => overview.card.content('phone')).should('be.visible')
            })

            it(`Should contain ${course.contactPhone} information of date of enrolled course`, () => {
                contentShouldContainValue(course, 'email', course.contactPhone)
            })

            it(`Should be able to see email of enrolled course`, () => {
                cy.get(overview.card.course(course.name)).within(() => overview.card.content('email')).should('be.visible')
            })

            it(`Should contain ${course.contactEmail} information of date of enrolled course`, () => {
                contentShouldContainValue(course, 'email', course.contactEmail)
            })

        })
    })
})