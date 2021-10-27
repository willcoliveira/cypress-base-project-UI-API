
Cypress.Commands.add('getTestData', (selector, ...args) => {
  return cy.get(`[data-test="${selector}"]`, ...args)
})

Cypress.Commands.add('bikeAPI', (method, path, body = '') => {
    const url = `https://api.sbx.qover.io/bike/v1/${path}`
    cy.request({
      method,
      url,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json, text/plain, */*',
      },
      body,
      failOnStatusCode: false,
    });
});



