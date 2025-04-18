import { cypressCourse, gatlingCourse, playwrightCourse } from "../fixtures/course"
import { validUser } from "../fixtures/user"
import { overview } from "../pages/overview"

describe('CREATE COURSE PAGE | ', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login(validUser.username, validUser.password)
        cy.get(overview.button.create).click()
    })

    it(`Should be able to create course - ${cypressCourse.name}`, () => {
        cy.createCourse(cypressCourse)
    })

    it(`Should be able to intercept create course POST - ${cypressCourse.name}`, () => {

        cy.intercept('POST', '/courses', (req) => {
            req.reply({
                statusCode: 200,
                body: playwrightCourse
            })
        }).as("postCourses")

        cy.createCourse(cypressCourse)

        cy.wait('@postCourses').then((interception) => expect(interception.response?.body.name).to.eq(playwrightCourse.name))
    })
})