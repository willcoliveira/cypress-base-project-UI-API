import * as base from './base';

const selectors = {
    termsAndConditionsCheckBox: '.sc-fja9c1-1 > .markdown',
    bikeTypeDropDown: 'bike.quote.type',
    bikeEqquippedDropDown: 'bike.quote.antiTheftMeasure',
    firstPlanModal: ':nth-child(1) > .sc-1klkbey-1',
    secondPlanModal: ':nth-child(2) > .sc-1klkbey-1',
    firstPlanChooseButton: 'bike.quote.card.VARIANT_THEFT_ASSISTANCE',
    secondPlanChooseButton: 'bike.quote.card.VARIANT_THEFT_DAMAGE_ASSISTANCE'
};

let defaultAnualPlanMessage = 'To be paid annually';

export const acceptTermsAndConditions = () => {
    cy.get(selectors.termsAndConditionsCheckBox).click({force: true});
};

export const assertTypesAvailableForBikes = () => {
    cy.getTestData(selectors.bikeTypeDropDown)
      .children()
      .eq(1).contains('City bike')
      .next().contains('Electric city bike (<25km/h)')
      .next().contains('Racing bike')
      .next().contains('Electric racing bike (<25km/h)')
      .next().contains('Mountainbike')
      .next().contains('Electric mountainbike (<25km/h)')
      .next().contains('Cargo bike')
      .next().contains('Electric cargo bike (<25km/h)');
  
    cy.getTestData(selectors.bikeEqquippedDropDown)
      .children()
      .eq(0).contains('Equipped without GPS tracker')
      .next().contains('Equipped with GPS tracker');
};

export const selectPolicyHolderGender = (option) => {
    cy.get(`[for="policyholder.title_${option}"]`)
      .click({force: true});
  };

export const assertSummaryDetails = () => {
    base.assertPageTitle('Summary of your insurance');
    cy.contains('TOTAL');
    cy.contains('Policyholder');
    cy.contains('Your bike');
    cy.contains('By continuing, you declare that:');
    cy.contains('Terms of service');
};

export const assertInsuranceCompletedMessage = () => {
    cy.contains('Congratulations!');
    cy.contains('Thank you for choosing our bike insurance.'); 
};

export const selectCurrentDate = (parameter) => {
    cy.getTestData(`${parameter}`)
      .click();
};

export const selectTestMethodPayment = () => {
    base.assertPageTitle('Pick your payment method');
    cy.get('[data-test="payment.ideal"] > .sc-1sca5tb-1').click();
    cy.get('[data-test="payment.price"]').click();
    cy.get('.common-ButtonGroup > .common-Button--default')
      .click();
};

export const assertMinPricePlans = (bike) => {
    cy.get(selectors.firstPlanModal)
      .children()
      .contains('Theft + assistance');
    cy.get(selectors.secondPlanModal)
      .children()
      .contains('Omnium');
  
    if (bike === 'City bike') {
      cy.get(selectors.firstPlanModal)
          .children()
          .eq(0)
          .contains('€65.26/year')
          .next()
          .contains('€5.44/month')
          .next()
          .contains(defaultAnualPlanMessage);
      
      cy.get(selectors.secondPlanModal)
          .children()
          .eq(0)
          .contains('€84.60/year')
          .next()
          .contains('€7.05/month')
          .next()
          .contains(defaultAnualPlanMessage);
      } else {
        cy.get(selectors.firstPlanModal)
          .children()
          .eq(0)
          .contains('€65.26/year')
          .next()
          .contains('€5.44/month')
          .next()
          .contains(defaultAnualPlanMessage);

        cy.get(selectors.secondPlanModal)
          .children()
          .eq(0)
          .contains('€90.41/year')
          .next()
          .contains('€7.54/month')
          .next()
          .contains(defaultAnualPlanMessage);
        };
  };
  
export const selectPlan = (number) => {
    if (number === '1') {
    cy.get(selectors.firstPlanModal).within(() => {
      cy.getTestData(selectors.firstPlanChooseButton).click();
    });
    } else {
      cy.get(selectors.secondPlanModal).within(() => {
        cy.getTestData(selectors.secondPlanChooseButton).click();
      });
    }
};

export const PriorDate = () => {
  const dayjs = require('dayjs');
  const date = dayjs().format(`DD/MM/2003`);
  return date;
};