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

import { Keywords } from "./constants"


// GET - user infos api here
Cypress.Commands.add('getUserInfos', () => {
    cy.fixture('user-get').then((data) => {
        cy.api({
            method: data.method,
            url: data.path
        }).its('body.payload')
    })
    
})

Cypress.Commands.add('getRewardInfos', () => {
    cy.fixture('reward-infos').then((data) => {
        cy.api({
            method: data.method,
            url: data.path
        }).its('body.payload')
    })
    
})


// GET - login infos
Cypress.Commands.add('loginTest', (accessToken) => {
    cy.api({
        method: "GET",
        url: `/login/callback?access_token=${accessToken}`
    })
    .then((resp) => {
        Cypress.env(Keywords.GARENA_COOKIE, resp.requestHeaders.cookie)
    })
})

// Request API (cypress-api-plugin) to set default header
Cypress.Commands.overwrite('request', (originalFn, url, options) => {
    if  (
        Cypress.env(Keywords.GARENA_COOKIE) === undefined 
        || url.headers?.cookie !== undefined ){ 
        // Default - For login api
        return originalFn(url, options)
    }
    else {
        // url.headers = {cookie: Cypress.env(Keywords.GARENA_COOKIE)};
        url.failOnStatusCode = false
  
    }
    return originalFn(url, options)
})



