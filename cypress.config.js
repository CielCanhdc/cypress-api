const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://daisu.ff.garena.vn",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "mochawesome",
    reporterOptions:{
      charts: true,
      overwrite: false,
      html: false,
      json: true,
      reportDir: "cypress/report/mocha-report"
    }
    
  },
});
