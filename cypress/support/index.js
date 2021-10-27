import './commands';

const dayjs = require('dayjs');
Cypress.dayjs = dayjs;

const addContext = require('mochawesome/addContext');

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`);
  }
});

Cypress.on('uncaught:exception', () => {
  return false;
});
