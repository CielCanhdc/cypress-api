# Automation Cypress Javascript

## Installation
* NPM version: 9.8.0
* Install dependencies
```npm install```
## Prerequisite
 - Dereference
const $RefParser = require('json-schema-ref-parser');
$RefParser.dereference('./cypress/fixtures/openapi.json', (err, data) => {


  - Export schema above file to pieces fixture files: ```node ./cypress/common/export-openapi-to-fixtures.js```

## Execution 
  - Run all test: ```npm run test:run```
  - Generate report: ```npm run report:generate```

## Reporting
* mocha-html report file: /mochawesome-report/cypress-tests-report.html
