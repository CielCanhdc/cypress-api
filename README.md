# Automation Cypress Javascript

## Installation
* NPM version: 9.8.0
* Install dependencies
```npm install```
## Prerequisite
  - Convert openapi file to schema: ```node ./cypress/support/convert-openapi-schema.js```
  - Export schema above file to pieces fixture files: ```node ./cypress/support/export-openapi-to-fixtures.js```

## Execution 
  - Run all test: ```npm run test:run```
  - Generate report: ```npm run report:generate```

## Reporting
* mocha-html report file: /mochawesome-report/cypress-tests-report.html