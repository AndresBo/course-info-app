describe('Note app', function() {
  beforeEach(function() {
    // reset test db and create a new user
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'administrator',
      username: 'admin',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
  })

  it('user can login', function(){
    cy.contains('log in').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('password')
    cy.get('#login-button').click()
    cy.contains('administrator logged in')
  })

  describe('when logged in', function () {
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'password'})
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('#new-note').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('an existing note', function() {
      beforeEach(function() {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('can be made not important', function() {
        cy.contains('another note cypress')
          .contains('make note not important')
          .click()

        cy.contains('another note cypress')
          .contains('make note important')
      })
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong credentials')
    cy.get('html').should('not.contain', 'administrator logged in')
  })
})
