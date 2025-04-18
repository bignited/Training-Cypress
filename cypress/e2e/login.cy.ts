import { validUser } from "../fixtures/user"
import { login } from "../pages/login"

const longStringUser = {
  username: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  password: 'aaaaaaaaaaaadaabaaaaaaaaagaaaaaaaaaaaaaaaaa',
}

const sameStringUser = {
  username: 'aaa',
  password: 'aaa',
}

const wrongMathUser = {
  username: 'ab',
  password: 'a11a'
}

const correctMathUser = {
  username: 'ab',
  password: 'a1a'
}

const validUsers = [validUser, correctMathUser]
const invalidUsers = [sameStringUser, wrongMathUser, longStringUser]

describe('LOGIN PAGE | ', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  validUsers.forEach((user) => {
    it(`Should be able to login succesfully - username: ${user.username} and password: ${user.password}`, () => {
      cy.login(user.username, user.password)
    })
  })

  invalidUsers.forEach((user) => {
    it(`Should not be able to login - username: ${user.username} and password: ${user.password}`, () => {
      cy.login(user.username, user.password)

      cy.get(login.message.error).should('be.visible')
    })
  })

  it('Should not be able to login when only clicking the login button', () => {
    cy.get(login.button.login).click()

    cy.get(login.message.error).should('be.visible')
  })

})