Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body))
  })
})
