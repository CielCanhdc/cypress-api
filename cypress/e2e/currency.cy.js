import { Account } from "../support/accounts"

describe('Test Profile', () => {
  before(() => {
    cy.loginMock(Account.HOST)
  })
  
  it('get profile successfully', () => {
    cy.fixture('profile__GET').then((data) => {
      
      cy.api({
        method: data.method,
        url: data.path,
      }).then((resp) => {
        cy.validateSchema(badges.schema[200], resp)
      })

      
    
    })
  })
})