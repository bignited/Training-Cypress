/// <reference types="cypress" />

import { Course } from "../fixtures/course"
import { createCourse } from "../pages/create-course"
import { login } from "../pages/login"
import { summary } from "../pages/summary"

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.get(login.input.username).type(username)
    cy.get(login.input.password).type(password)
    cy.get(login.button.login).click()
})

Cypress.Commands.add('fillForm', (course: Course) => {
    cy.get(createCourse.input.name).type(course.name)
    cy.get(createCourse.input.description).type(course.description)
    cy.get(createCourse.select.location).select(course.location)
    cy.get(createCourse.input.teacher).type(course.teacher)
    cy.get(createCourse.input.date).type(course.date)
    cy.get(createCourse.input.startTime).type(course.timeStart)
    cy.get(createCourse.input.endTime).type(course.timeEnd)
    cy.get(createCourse.button.uploadImage).selectFile(course.image, {force : true})
    cy.get(createCourse.input.phone).type(course.contactPhone)
    cy.get(createCourse.input.email).type(course.contactEmail)
    cy.get(createCourse.radio.type(course.type)).click()
    
    cy.get(createCourse.button.addCourse).click()
})


Cypress.Commands.add('createCourse', (course: Course) => {
    cy.fillForm(course)
    cy.get(summary.button.approve).click()
})