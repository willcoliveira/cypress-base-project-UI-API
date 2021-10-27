let apiKey = 'apikey=pk_E897102E9D9E17215287';
let defaultBody = '/body/default';
let defaultBodyFullPath = 'cypress/fixtures/body/default.json';
let draftEndPoint = 'drafts';
let draftID = '4005c54d-c7f6-4bcf-81c9-f5a47c1b3a56';


function assertSuccessResponses(code, res) {
  if (code === 200) {
    expect(res.status).to.be.equal(code);
    expect(res.statusText).to.be.equal('OK');
  } else {
    expect(res.status).to.be.equal(code);
    expect(res.statusText).to.be.equal('Created');
  }
  expect(res.body).to.not.be.empty;
};

function assertFailedResponses(res) {
  expect(res.status).to.be.equal(400);
  expect(res.statusText).to.be.equal('Bad Request');
  expect(res.body).to.not.be.empty;
  expect(res.body.code).to.be.equal('DRAFT_VALIDATION');
};

function currentDate () {
  const dayjs = require('dayjs');
  const currentDate = dayjs().format('YYYY-MM-DD');
  const finalDateData = `${currentDate}T22:00:00.000Z`;
  cy.fixture(defaultBody).then(bodyContent => {
    const testDataBody = {
        ...bodyContent,
        startDate: finalDateData
    };
  cy.writeFile(defaultBodyFullPath, testDataBody);
  });
};


describe('Bike API', () => {
  before(() => {
    currentDate();
  });
  
  it('should check setup creation', () => {
  cy.fixture(defaultBody).then(bodyContent => {
    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, bodyContent)
      .as('response')
          .then((res) => {
            assertSuccessResponses(201, res);
      });
    });
  });

  it('should create minimal draft country', () => {
    cy.fixture(defaultBody).then(bodyContent => {
    cy.bikeAPI('POST',`${draftEndPoint}?${apiKey}`, bodyContent)
      .as('response')
          .then((res) => {
            assertSuccessResponses(201, res);
      });
    });
  });

  it('should update minimal draft country', () => {
    cy.fixture(defaultBody).then(bodyContent => {
    cy.bikeAPI('PUT',`${draftEndPoint}/${draftID}?${apiKey}`, bodyContent) 
      .as('response')
        .then((res) => {
          assertSuccessResponses(200, res);
      });
    });
  });

  it('should check bad data creation', () => {
    const testDataBody = {
      entityTypeNotAllowed: 'ENTITY_TYPE_COMPANY',
    };

    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, testDataBody)
      .as('response')
          .then((res) => {
            assertFailedResponses(res);
      });
  });

  it('should get minimal draft country', () => {
    cy.fixture(defaultBody).then(bodyContent => {
    cy.bikeAPI('GET',`${draftEndPoint}/${draftID}?${apiKey}`, bodyContent) 
      .as('response')
        .then((res) => {
          assertSuccessResponses(200, res);
      });
    });
  });

  it('should create a full draft person', () => {
    cy.fixture(defaultBody).then(bodyContent => {
    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, bodyContent) 
      .as('response')
        .then((res) => {
          assertSuccessResponses(201, res);
      });
    });
  });

  it('should not create a full draft person - future start date', () => {
    cy.fixture(defaultBody).then(bodyContent => {
    
    const testDataBody = {
        ...bodyContent,
        startDate : "2022-05-18"
    };

    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, testDataBody) 
      .as('response')
        .then((res) => {
          assertFailedResponses(res);
          expect(res.body.details[0].code).to.be.equal('STARTDATE_TOO_FAR');
          expect(res.body.details[0].msg).to.be.equal('Contract start date is too late in the future');
          expect(res.body.details[0].fields[0]).to.be.equal('startDate');
      });
    });
  });

  it('should not create a full draft person - past start date', () => {
    cy.fixture(defaultBody).then(bodyContent => {
    
    const testDataBody = {
        ...bodyContent,
        startDate : "2021-05-18"
    };

    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, testDataBody) 
      .as('response')
        .then((res) => {
          assertFailedResponses(res);
          expect(res.body.details[0].code).to.be.equal('STARTDATE_NOT_IN_PAST');
          expect(res.body.details[0].msg).to.be.equal('Contract start date can not be in the past');
          expect(res.body.details[0].fields[0]).to.be.equal('startDate');
      });
    });
  });

  it('should not create a full draft person - minimum age', () => {
    cy.fixture(defaultBody).then(bodyContent => {

    const testDataBody = {
        ...bodyContent,
        policyholder : { birthdate: "2010-05-18" } 
    };

    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, testDataBody) 
      .as('response')
        .then((res) => {
          assertFailedResponses(res);
          expect(res.body.details[0].code).to.be.equal('MINIMUM_AGE_ADULT');
          expect(res.body.details[0].message).to.be.equal('Adult should be at least 18 years old');
          expect(res.body.details[0].fields[0]).to.be.equal('policyholder.birthdate');
      });
    });
  });

  it('should not create a full draft person - maximum age', () => {
    cy.fixture(defaultBody).then(bodyContent => {

    const testDataBody = {
        ...bodyContent,
        policyholder : { birthdate: "1800-05-18" } 
    };

    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, testDataBody) 
      .as('response')
        .then((res) => {
          assertFailedResponses(res);
          expect(res.body.details[0].code).to.be.equal('MAXIMUM_AGE_ADULT');
          expect(res.body.details[0].message).to.be.equal('Adult should be less than 120 years old');
          expect(res.body.details[0].fields[0]).to.be.equal('policyholder.birthdate');
      });
    });
  });

  it('should not create a full draft person - future bike Purchase Date', () => {
    cy.fixture(defaultBody).then(bodyContent => {

    const testDataBody = {
        ...bodyContent,
        risk : { bikePurchaseDate: "2021-11-01" } 
    };

    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, testDataBody) 
      .as('response')
        .then((res) => {
          assertFailedResponses(res);
          expect(res.body.details[0].code).to.be.equal('BIKEPURCHASEDATE_FUTURE');
          expect(res.body.details[0].msg).to.be.equal('BikePurchaseDate cannot be in the future');
          expect(res.body.details[0].fields[0]).to.be.equal('risk.bikePurchaseDate');
      });
    });
  });

  it('should not create a full draft person - past bike Purchase Date', () => {
    cy.fixture(defaultBody).then(bodyContent => {

    const testDataBody = {
        ...bodyContent,
        risk : { bikePurchaseDate: "2019-11-01" } 
    };

    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, testDataBody) 
      .as('response')
        .then((res) => {
          assertFailedResponses(res);
          expect(res.body.details[0].code).to.be.equal('BIKEPURCHASEDATE_TOO_FAR');
          expect(res.body.details[0].msg).to.be.equal('BikePurchaseDate start date is too far in the past');
          expect(res.body.details[0].fields[0]).to.be.equal('risk.bikePurchaseDate');
      });
    });
  });

  it('should create a full draft company', () => {
    cy.fixture(defaultBody).then(bodyContent => {

    const testDataBody = {
        ...bodyContent,
        policyholder: {
          entityType: 'ENTITY_TYPE_COMPANY',
          vatIn: "BE0200000340",
          companyName: "Clothing s",
          billingAddress: {
            country: "BE",
            city: "North Joliemouth",
            zip: "1000",
            street: "Carmella Ranch",
            number: "538/f",
            box: "7-893"
          }
        },
    };

    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, testDataBody) 
      .as('response')
        .then((res) => {
          assertSuccessResponses(201, res);
          expect(res.body.policyholder.entityType).to.be.equal('ENTITY_TYPE_COMPANY');
          expect(res.body.policyholder.vatIn).to.be.equal('BE0200000340');
          expect(res.body.policyholder.billingAddress.country).to.be.equal('BE');
      });
    });
  });

  it('should not create a full draft company - different country', () => {
    cy.fixture(defaultBody).then(bodyContent => {

    const testDataBody = {
        ...bodyContent,
        policyholder: {
          entityType: 'ENTITY_TYPE_COMPANY',
          vatIn: "BE0200000340",
          companyName: "Clothing s",
          billingAddress: {
            country: "NE",
            city: "Amsterdam",
            zip: "1000",
            street: "Carmella Ranch",
            number: "538/f",
            box: "7-893"
          }
        },
    };

    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, testDataBody) 
      .as('response')
        .then((res) => {
          assertFailedResponses(res);
          expect(res.body.details[0].code).to.be.equal('COUNTRY_INVALID');
          expect(res.body.details[0].message).to.be.equal('This country is not available');
          expect(res.body.details[0].fields[0]).to.be.equal('policyholder.billingAddress.country');
          expect(res.body.details[1].code).to.be.equal('INVALID_COUNTRY');
          expect(res.body.details[1].message).to.be.equal('Invalid country');
          expect(res.body.details[1].fields[0]).to.be.equal('policyholder.billingAddress.country');
      });
    });
  });

  it('should not create a full draft company - type of validation', () => {
    cy.fixture(defaultBody).then(bodyContent => {

    const testDataBody = {
        ...bodyContent,
        policyholder: {
          entityType: 'ENTITY_TYPE_COMPANY',
          companyNameS: "Clothing s",
          billingAddress: ""
        },
    };

    cy.bikeAPI('POST', `${draftEndPoint}?${apiKey}`, testDataBody) 
      .as('response')
        .then((res) => {
          assertFailedResponses(res);
          expect(res.body.details[0].code).to.be.equal('VALIDATION_ERROR');
          expect(res.body.details[0].message).to.be.equal('policyholder.billingAddress is not of a type(s) object');
          expect(res.body.details[0].fields[0]).to.be.equal('policyholder.billingAddress');
      });
    });
  });
});
