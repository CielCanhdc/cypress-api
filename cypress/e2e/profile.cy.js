import { Account, AccountDetail } from "../support/accounts"

describe('Test Profile', () => {
  before(() => {
    cy.loginMock(Account.HOST)
  })
  it ('inspect myself - host', () => {
    cy.getInspect().then((res) => {
      expect(res.user).to.deep.include(AccountDetail[Account.HOST.email])
    })
  })

  it ('get my profile', () => {
    let requestData = {
      fixture: "profiles__GET",
      body: {userId: AccountDetail[Account.HOST.email].id}
    }
    console.log('object :>> ', requestData);
    cy.apiCall(requestData).then((res) => {
      console.log('res :>> ', res);
      cy.validateSchema(requestData.fixture, res)
      cy.validateCode(res)
    })

  })

  it.skip ('get friend profile', () => {
  
  })

  it.skip ('get my profile config', () => {
  
  })

  it.skip ('update my profile image', () => {
  
  })

  it.skip ('update my profile intro', () => {
  
  })


})