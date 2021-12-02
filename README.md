# Business Case
This Automation business case resolution PART 2 is using [Cypress](https://www.cypress.io/) as it's testing tool. The API documentation is available [here](https://docs.cypress.io/api/api/table-of-contents.html). So, there are 2 ways of running tests using Cypress either using the UI or using the command line (script mode).

#### How to install this project
First of all it will be necessary to install and check node version in your machine. This is the only pre-requisite to run this project. So, in order to have npm and Node.js installed you can download and read the more instructions in [node](https://nodejs.org/en/download/).

After the completing the installation. Open and go to the terminal for your preference, select the current node version (for this check `.nvmrc`) to see if the current one into your machine is == or >> v14 for example.

> ```bash
> # Selecting the version of this project
> nvm use
> # Checking the version installed
> npm -v
> ```

After the completed node's installation, you will need to clone this current repo.
> ```bash
> # Git Link
> git clone https://github.com/willcoliveira/cypress-base-project-UI-API.git
> git@github.com:willcoliveira/cypress-base-project-UI-API.git
> ```

#### Installing the dependencies
After cloning the repository from github. Open the root folder of this project and install the dependecies from the package.json file. This file contains all the necessary dependecies to run, validate, debug and install the automation project. You can use one of the following ways to install it:

> ```bash
> yarn or
> npm install
> ```

If it doesn't work for the first time, you can also install yarn locally and repeat the previous step.
> ```bash
> npm install --global yarn
> ```

You will see the following messages:

> ```bash
> yarn install v1.22.17
> info No lockfile found.
> [1/4] 🔍  Resolving packages...
> [2/4] 🚚  Fetching packages...
> [3/4] 🔗  Linking dependencies...
> [4/4] 🔨  Building fresh packages...
> success Saved lockfile.
> ✨  Done in 19.38s.
> ```

After the messages above you will be able to validate the installation.

#### How to Run the tests using Cypress Interface
In order to run the specs with headed GUI and have a way to debug the tests start Cypress using:

> ```bash
> yarn cy:open
> ```

![Cypress UI](images/cypressUI.png)

With the command above, Cypress interface will be open and you can select the browser and the exactly file that you want to run. In addition, you are able to select to run all files directly clicking on "Run All Specs" Button.

After opening the UI, you can simple click in one of the test specs and execute it. In alternative you can click on `Run integration specs` that will run all of the visible specs. 

![Cypress Execution](images/cypressExecution.png)

Note: The UI tests are running only against the url provided at this moment.

In addition to that option you can run the following script to run the UI tests and follow the UI execution:
> ```bash
> yarn test:ui
> ```

and the API ones as well.
> ```bash
> test:api
> ```

#### How to run this project CLI
You can run all the tests using the cli it means that you will be able to run the tests using the headless mode of the browser. So you won't see any browser interactions however the tests will be running on the same way of the interface. 

For UI:
> ```bash
> yarn test:ui:headless:mocha
> ```

For API:
> ```bash
> yarn test:api:mocha
> ```

### How to analyse the Cypress Test Results
Current this project is using mochawesome plugin as its report generator. So once one of the execution is done you will be able to access the test report for the same one when using the following commands:

> ```bash
> yarn test:ui:headless:mocha or yarn test:api:mocha
> ```

![Generating the test Report](images/generatingReport.png)

You will be able to see a full report on the link created as it is possible to see on the image above

> ```bash
> /Users/WOliv4/Documents/App/qo/cypress/reports/output.html
> ```
 
### Final Report
![Test Report](images/testReport.png)
![Test Report 2](images/testReport2.png)

### Final Report with Failures
Also, If the test fails it will show the exactly step and a screenshot of that moment. So with this support, you will be able to go to the test and analyse properly the results. 

![Test Report failures details](images/failuresDetails.png)



---------------------------

### PART 1 – TEST STRATEGY & PLANNING - EXERCISE
We aim to set-up automated tests that run each time when we release something into production
(that usually happens multiple times during the week as we work with continuous releases).
The tests should verify that: all the business rules are validated, the contract is created and that
also the prices are correct. The rating factors (= the parameters that have an influence on the price)
are only the elements of step 1.
Your case:
- Considering Qover business model and products, what type of tests would you prioritize,
automate and execute?

In my opinion for the frontend we will be able to cover and improve the test coverage implementing a visual refression for the components where we will be able to validate the differences on the UIs for each realease as well as for each main changes that we have in terms of components, packages, uiKits, and all the code related to the front.

In addition to that, the unit test coverage will be able improve our first validation within the develelopment team and in this project where we have a Javascript frontend based we will be able to setup this "template" for automation and starting the whole integration tests using mock data or for example using a staging environrment url on the same way that I made here.

The additional coverage for emails validation, cross browser and other "End to End" or business risk based scenarios could also be included on this repo. We can simple create some specific test files for all the other features. 


- Considering the application provided (url above), could you make a checklist of
features/scenarios to test? (No need for step by step test cases, but a list of items you would
execute if you are to test our application)

Considering the application provided and the test project developed here. I'd say that we can cover most part of the features for the BIKE project.
- Starting from all of the UIs (Your quote for, Policy Holder, Insurance, Bike Details, Summary Details, Payment Options and Details)
- External Integrations on payments and emails received
- All the different browsers and translations for the countries and languages available and maybe different viewports if we need to test in other devices.
- Legal Mentions and Questions content/links.
- Chat and Contact us feature and its options   
- Discount values
- Different combinations in type of bikes, prices and plans values.
- Messages, popups and errors
- Plans for private person and for company and those custom data
- External links
- Contract details, conditions and changes

Also, I'd say from the API point of view we can cover those features and add the data directly on the UI using a vertical approach for testing, combine both strategies and getting a fast feedback for each commit/feature.

