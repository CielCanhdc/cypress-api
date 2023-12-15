const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://garenavnsocial.web.test.freefiremobile.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      schemaCheckRequired: true,  // false if no need validate response schemas 
    },
    reporter: "mochawesome",
    reporterOptions:{
      charts: true,
      overwrite: false,
      html: false,
      json: true,
      reportDir: "cypress/report/mocha-report"
    },
    fixturesFolder: 'cypress/fixtures/api'
    
  },
});
