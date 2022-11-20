describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = { name: 'E2E tester', username: 'Bot', password: 'cypress' }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#Username').type('Bot')
      cy.get('#Password').type('cypress')
      cy.get('#Login-button').click()
      cy.get('.confirmation').should(
        'contain',
        'Hello Bot! Your authentication was succesful.'
      )
      cy.get('.confirmation').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('E2E tester, you are logged in.')
      cy.contains('Blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#Username').type('Bot')
      cy.get('#Password').type('wrongPassword')
      cy.get('#Login-button').click()
      cy.get('.error').should('contain', 'Invalid username or password.')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'you are logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Bot', password: 'cypress' })
      cy.visit('http://localhost:3000')
    })
    it('A new blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('.Title').type('Cypress vs Robot framework')
      cy.get('.Author').type('Quintagroup')
      cy.get('.url').type(
        'https://quintagroup.com/blog/cypress-vs-robot-framework'
      )
      cy.get('#sendButton').click()

      cy.get('.confirmation').should(
        'contain',
        'A new blog added: Cypress vs Robot framework by Quintagroup'
      )
      cy.get('.confirmation').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Cypress vs Robot framework - Quintagroup')
    })
  })
  describe('After a blog has been created', function () {
    beforeEach(function () {
      cy.login({ username: 'Bot', password: 'cypress' })
      cy.visit('http://localhost:3000')
      cy.contains('New blog').click()
      cy.get('.Title').type('Cypress vs Robot framework')
      cy.get('.Author').type('Quintagroup')
      cy.get('.url').type(
        'https://quintagroup.com/blog/cypress-vs-robot-framework'
      )
      cy.get('#sendButton').click()
    })
    it('A blog can be liked', function () {
      cy.contains('show').click()
      cy.get('#likes').contains('0')
      cy.get('#likeButton').click()
      cy.get('#likes').contains('1')
    })
    it.only('A blog can be deleted', function () {
      cy.contains('show').click()
      cy.contains('remove').click()

      cy.get('.confirmation').should(
        'contain',
        'The blog Cypress vs Robot framework by Quintagroup was successfully deleted.'
      )
      cy.get('.confirmation').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('html').should('not.contain', 'show')
    })
  })
})
