import { StatusCode } from "../support/constants"

describe('template spec', () => {

  before(() => {
    cy.fixture('account-infos').then((account) => {
      cy.loginTest(account.data[0].admin.accessToken)
    })
  })
  
  it('test get user data successfully', () => {

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
})