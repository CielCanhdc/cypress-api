import { StatusCode } from "../support/constants"

describe('Test Badge', () => {

  before(() => {
    cy.fixture('account-infos').then((account) => {
      cy.loginTest(account.data[0].admin.accessToken)
    })
  })
  
  it('get my badge', () => {

    cy.fixture('user-get').then((data) => {
      cy.api({
        method: data.method,
        url: data.path,
      }).then((resp) => {
        console.log(resp.body.payload)
        expect(resp.status).to.eq(StatusCode.OK)
      })
    })
  })

  it ('pin my badge', () => {
  
  })
  
  it (' - pin the unowned badge', () => {
  
  })

})