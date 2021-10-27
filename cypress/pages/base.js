const selectors = {
  errorRequiredField: 'error.required',
  continueButton: 'bottomNav.continue'
};

export const assertPageTitle = (page) => {
  cy.contains(page);
};

export const addDataValue = (page, parameter, value) => {
  if (page === 'bike.quote') {
    cy.getTestData(`bike.quote.${parameter}`)
      .clear()
      .type(value);
  } else if (page === 'bike.bike') {
    cy.getTestData(`bike.bike.${parameter}`)
      .clear()
      .type(value);
  } else if (page === 'bikeSerialNumber') {
    cy.getTestData(`bike.bikeSerialNumber.${parameter}`)
      .clear()
      .type(value);
  } else {
    cy.getTestData(`policyholder.${parameter}`)
      .clear()
      .type(value);
  }
};

export const assertErrorMessage = (parameter, message) => {
  cy.getTestData(`error.${parameter}`)
    .should('have.length', 1)
    .and('contain', message);
};

export const assertRequiredFieldsMessage = (numberOfRequiredFields) => {
  cy.getTestData(selectors.errorRequiredField)
    .should('have.length', numberOfRequiredFields)
    .and('contain', 'Required');
};

export const clearCookies = () => {
  cy.clearCookies({ domain: null });
  cy.clearLocalStorage();
};

export const forceCookie = () => {
  cy.setCookie('atlassian.xsrf.token', 'ACXF_937d4ee0ec566272937cd064ea4809d4bd280489_lout');
};

export const clickOn = (button) => {
  if (button === 'continue') {
    cy.getTestData(selectors.continueButton)
      .click();
  } else {
    cy.getTestData(`bike.quote.${button}`)
      .click();
  }
};

export const selectOption = (parameter, option) => {
  cy.getTestData(`bike.quote.${parameter}`)
    .select(option);
};

export const visitPage = (page) => {
  if (page =! 'home') {
    cy.visit(page);
  } else {
    cy.visit("bike/quote?key=pk_9153C6B0DDB3C97367AE&locale=en-BE");
  }
};






  
