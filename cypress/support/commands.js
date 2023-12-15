// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { Keywords, StatusCode } from "./constants"
import { Account } from "./accounts"

// GET - login callback
Cypress.Commands.add('loginCallback', (accessToken) => {
    cy.api({
        method: "GET",
        url: `/login/callback?access_token=${accessToken}`
    })
    .then((resp) => {
        Cypress.env(Keywords.GARENA_COOKIE, resp.requestHeaders.cookie)
    })
})

// GET - user profile api here
Cypress.Commands.add('getProfile', (role) => {
    let requestData = {fixture:"profiles__GET", body:{}}
    cy.apiCall(requestData, role)
})

// GET - badges api here
Cypress.Commands.add('getBadges', (role) => {
    let requestData = {fixture:"badges__GET", body:{}}
    cy.apiCall(requestData, role)
})

// GET - feeds api here
Cypress.Commands.add('getFeeds', (role) => {
    let requestData = {fixture:"feeds__GET", body:{}}
    cy.apiCall(requestData, role)
})

// GET - kudos api here
Cypress.Commands.add('getKudos', (role) => {
    let requestData = {fixture:"kudos__GET", body:{}}
    cy.apiCall(requestData, role)
})

// GET inspect a user
Cypress.Commands.add('getInspect', (role) => {
    let requestData = {fixture:"inspect__GET", body:{}}
    cy.apiCall(requestData, role)
})

// GET currency of a user
Cypress.Commands.add('getCurrentcy', (role) => {
    let requestData = {fixture:"currencies-me__GET", body:{}}
    cy.apiCall(requestData, role)
})

// API request with login => for checked users
Cypress.Commands.add('apiCall', (requestData, role) => {
    const { fixture, body = {} } = requestData;
    const makeApiCall = (fixtureData, key) => {
        const requestOptions = {
            method: fixtureData.method,
            url: fixtureData.path,
            headers: { "x-api-key": key },
            [fixtureData.method === 'GET' ? 'qs' : 'body']: body
        };
        if (!key) delete requestOptions.headers
        
        return cy.api(requestOptions).its('body');
    };
    
    if (role) {
        // For others account
        cy.loginMock(role).then((key) => {
            cy.fixture(fixture).then((data) => makeApiCall(data, key));
        });
    } else {
        // For host account
        cy.fixture(fixture).then((data) => makeApiCall(data, null));
    }
});




// Request API (cypress-api-plugin) to set default header
Cypress.Commands.overwrite('request', (originalFn,  options) => {
    if (options.headers?.["x-api-key"] !== undefined  || options.url.includes("auth/login")) {
        console.log('guest request');
    }
    else {
        options.headers = {"x-api-key": Cypress.env(Keywords.APIKEY)};
        // options.failOnStatusCode = true
    }
    return originalFn(options)
})

// POST - authen login mock
Cypress.Commands.add('loginMock', (role) => {
    // "role" to hide account secret info in e2e test file: ex role=Account.HOST. All visit account have to define in support/accounts.js
    cy.api({
        method: "POST",
        url: "/auth/login/mock",
        body: {
            "email": role.email,
            "secret": role.secret
        }
    })
    .then((resp) => {
        expect(resp.status).to.eq(StatusCode.OK)
        if (role=Account.HOST) Cypress.env(Keywords.APIKEY, resp.body.apiKey);        
        return resp.body.apiKey

    })
})

// Validate response Json schema
Cypress.Commands.add('validateSchema', (fixtureFile, response) => {
    console.log('response :>> ', response);
    if (Cypress.env('schemaCheckRequired')) { // if allow validate response schema
       
        cy.fixture(fixtureFile).its('schema').then((schema) => {
            var validator = require('is-my-json-valid')
            var validate = validator(schema[200])
            var result = validate(response)
            cy.log('error: ', JSON.stringify(validate.errors))
            
            cy.then(() => { // For Async print cy.log()
                expect(result).to.be.true
            })
        })        
    } else {
        console.log("no need validate this schema")
    }
})

Cypress.Commands.add('validateCode', (response) => {
    console.log('response :>> ', response);
    expect(response.status).to.eq(StatusCode.OK)
})