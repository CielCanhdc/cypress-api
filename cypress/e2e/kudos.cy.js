import { StatusCode } from "../support/constants"

describe('Test Kudos', () => {

  before(() => {
    cy.fixture('account-infos').then((account) => {
      cy.loginTest(account.data[0].admin.accessToken)
    })
  })
  
  it('creat a kudos to person', () => {
    // Check in my kudos
    // Check in target person
    // Check in the other who did not mention
  })

  it ('create a kudos to a group', () => {
    // Check in my kudos
    // Check in target group member
  })
  
  it('creat a kudos private', () => {
    // Check in my kudos
    // Check in target person
    // Check in the other 
  })

  it('creat a kudos with some hash tags', () => {

  })

  it('creat a kudos with sendable currency', () => {
    // Check in my kudos
    // Check in target person
    // Check in the other 
  })

  it('update a kudos info', () => {

  })


})