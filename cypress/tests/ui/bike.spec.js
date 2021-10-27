import * as base from '../../pages/base';
import * as bike from '../../pages/bike';

let userDetailsTestData = {
  firstName: 'Username firstName',
  lastName: 'Username lastname',
  birthdate: '01021990',
  phone: '025889716',
  email: 'username@gmail.com',
  street: 'Av Louise',
  number: '10',
  box: '4',
  postcode: '1000',
  city: 'Brussels',
  bike: {
    name: 'Milenium',
    year: '2021',
    serialNumber: '20210000000101202',
    value: {
      default: '250',
      max: '15000',
      min: '249',
    },
    type: {
      default: 'Racing bike',
      custom: 'City bike'
    }
  },
};

describe('Bike', () => {
    beforeEach(() => {
        base.forceCookie();
        base.visitPage('home');
        base.assertPageTitle('Your quote for');
    });

    afterEach(() => {
        base.clearCookies();
    });
  
    it('you quote for - should verify all required fields', () => {
        base.clickOn('priceInfoButton');
        base.assertRequiredFieldsMessage(2);
    });

    it('you quote for - should verify required fields case price', () => {
        base.selectOption('type', userDetailsTestData.bike.type.default);
        base.clickOn('priceInfoButton');
        base.assertRequiredFieldsMessage(1);
    });

    it('you quote for - should verify required fields type of bike', () => {
        base.addDataValue('bike.quote', 'originalValue', userDetailsTestData.bike.value.default);
        base.clickOn('priceInfoButton');
        base.assertRequiredFieldsMessage(1);
    });

    it('you quote for - should verify min price error message', () => {
        base.selectOption('type', userDetailsTestData.bike.type.default);
        base.addDataValue('bike.quote', 'originalValue', userDetailsTestData.bike.value.min);
        base.clickOn('priceInfoButton');
        base.assertErrorMessage('minValue', 'Min 250');
    });

    it('you quote for - should verify max price error message', () => {
        base.selectOption('type', userDetailsTestData.bike.type.default);
        base.addDataValue('bike.quote', 'originalValue', userDetailsTestData.bike.value.max);
        base.clickOn('priceInfoButton');
        base.assertErrorMessage('maxValue', 'Max. €10.000');
    });

    it('you quote for - should verify type of bikes and eqquipped types available', () => {
        bike.assertTypesAvailableForBikes();
    });

    it('you quote for - should verify plans price for City bike with min price', () => {
        base.selectOption('type', userDetailsTestData.bike.type.custom);
        base.addDataValue('bike.quote', 'originalValue', userDetailsTestData.bike.value.default);
        base.clickOn('priceInfoButton');
        bike.assertMinPricePlans('City bike');
    });

    it('you quote for - should verify the plans prices for Racing bike with min price', () => {
        base.selectOption('type', userDetailsTestData.bike.type.default);
        base.addDataValue('bike.quote', 'originalValue', userDetailsTestData.bike.value.default);
        base.clickOn('priceInfoButton');
        bike.assertMinPricePlans('Racing bike');
    });

    it('you quote for - should select first plan and move to policy holder', () => {
        base.selectOption('type', userDetailsTestData.bike.type.default);
        base.addDataValue('bike.quote', 'originalValue', userDetailsTestData.bike.value.default);
        base.clickOn('priceInfoButton');
        bike.selectPlan(1);
        base.assertPageTitle('Policyholder');
    });

    it('policy holder - should not complete policy holder details as a private person due to missing required data', () => {
        base.selectOption('type', userDetailsTestData.bike.type.default);
        base.addDataValue('bike.quote', 'originalValue', userDetailsTestData.bike.value.default);
        base.clickOn('priceInfoButton');
        bike.selectPlan(1);
        base.assertPageTitle('Policyholder');
        bike.selectPolicyHolderGender(1);
        base.clickOn('continue');
        base.assertRequiredFieldsMessage(9);
    });

    it('policy holder - should not complete policy holder details as a private person due to min age', () => {
        let testDate = bike.PriorDate();
        base.selectOption('type', userDetailsTestData.bike.type.default);
        base.addDataValue('bike.quote', 'originalValue', userDetailsTestData.bike.value.default);
        base.clickOn('priceInfoButton');
        bike.selectPlan(1);
        base.assertPageTitle('Policyholder');
        base.addDataValue('policyholder', 'birthdate', '01022010');
        base.clickOn('continue');
        base.assertErrorMessage('maxDate', `The date should be prior to ${testDate}`);
    });

    it('policy holder - should not complete policy holder details as a private person due to post code', () => {
        base.selectOption('type', userDetailsTestData.bike.type.default);
        base.addDataValue('bike.quote', 'originalValue', userDetailsTestData.bike.value.default);
        base.clickOn('priceInfoButton');
        bike.selectPlan(1);
        base.assertPageTitle('Policyholder');
        bike.selectPolicyHolderGender(1);
        base.addDataValue('policyholder', 'firstName', userDetailsTestData.firstName);
        base.addDataValue('policyholder', 'lastName', userDetailsTestData.lastName);
        base.addDataValue('policyholder', 'birthdate', userDetailsTestData.birthdate);
        base.addDataValue('policyholder', 'phone', userDetailsTestData.phone);
        base.addDataValue('policyholder', 'email', userDetailsTestData.email);
        base.addDataValue('policyholder', 'address.input.street', userDetailsTestData.street);
        base.addDataValue('policyholder', 'address.input.number', userDetailsTestData.number);
        base.addDataValue('policyholder', 'address.input.box', userDetailsTestData.box);
        base.addDataValue('policyholder', 'address.input.postcode', '$$$$');
        base.addDataValue('policyholder', 'address.input.city', userDetailsTestData.city);
        base.clickOn('continue');
        base.assertErrorMessage('invalidZip', 'Please enter a valid postcode');
    });

    it('insurance - should complete an insurance plan as a private person', () => {
        base.selectOption('type', userDetailsTestData.bike.type.default);
        base.addDataValue('bike.quote', 'originalValue', userDetailsTestData.bike.value.default);
        base.clickOn('priceInfoButton');
        bike.selectPlan(1);
        base.assertPageTitle('Policyholder');
        bike.selectPolicyHolderGender(1);
        base.addDataValue('policyholder', 'firstName', userDetailsTestData.firstName);
        base.addDataValue('policyholder', 'lastName', userDetailsTestData.lastName);
        base.addDataValue('policyholder', 'birthdate', userDetailsTestData.birthdate);
        base.addDataValue('policyholder', 'phone', userDetailsTestData.phone);
        base.addDataValue('policyholder', 'email', userDetailsTestData.email);
        base.addDataValue('policyholder', 'address.input.street', userDetailsTestData.street);
        base.addDataValue('policyholder', 'address.input.number', userDetailsTestData.number);
        base.addDataValue('policyholder', 'address.input.box', userDetailsTestData.box);
        base.addDataValue('policyholder', 'address.input.postcode', userDetailsTestData.postcode);
        base.addDataValue('policyholder', 'address.input.city', userDetailsTestData.city);
        base.clickOn('continue');
        base.assertPageTitle('About your bike');
        base.addDataValue('bike.bike', 'make', userDetailsTestData.bike.name);
        base.addDataValue('bike.bike', 'model', userDetailsTestData.bike.year);
        base.clickOn('continue');
        base.assertPageTitle('About your bike');
        base.clickOn('continue');
        base.assertPageTitle('About your bike');
        base.assertPageTitle('What did you buy?');
        bike.selectCurrentDate('bike.bikeCondition.newBikePurchaseDate');
        base.clickOn('continue');
        base.addDataValue('bikeSerialNumber', 'serialNumber', userDetailsTestData.bike.serialNumber);
        base.clickOn('continue');
        base.assertPageTitle('When would you like your contract to start?');
        bike.selectCurrentDate('bike.finalization.startDate');
        base.clickOn('continue');
        base.assertPageTitle('Summary of your insurance');
        bike.assertSummaryDetails();
        bike.acceptTermsAndConditions();
        base.clickOn('continue');
        bike.selectTestMethodPayment();
        bike.assertInsuranceCompletedMessage();
    });
});
