import { userExtraInfo } from "../support/fake-data"

describe('Test Feeds', () => {
  before(() => {
    cy.fixture('account-infos').then((account) => {
      cy.loginTest(account.data[0].admin.accessToken)
    })
  })

  it ('creat feed', () => {

  })

  it ('get my feed', () => {
    // Prepare  
    let customPayload;
    const fakedData = userExtraInfo();

    cy.fixture('user-update')
    .then((data) => {
      customPayload = data.payload;
      for (const key in customPayload) {
          if (fakedData.hasOwnProperty(key)) customPayload[key] = fakedData[key]
      }
      // Execute API
      cy.api({
          method: data.method,
          url: data.path,
          body: customPayload
      })
      .then((resp) => {
          console.log('resp update:>> ', resp);
          expect(resp.body.payload.user_infos.mail).to.eq(customPayload.mail)

        })
    })
    
    cy.fixture('user-get').then((user) => {
      cy.api({
        method: user.method,
        url: user.path,
      }).as('user')
      .then((resp2) => {
        console.log('resp user get:>> ', resp2);
        console.log('customPayload 3:>> ', customPayload);
        expect(resp2.body.payload.user_infos.mail).to.eq(customPayload.mail)
      })
    })
    
      

  })

  it ('get friend feed', () => {

  })

  it ('react my feed ', () => {

  })

  it ('react friend feed ', () => {

  })

  it ('comment my feed ', () => {

  })

  it ('comment friend feed ', () => {

  })

  it ('comment mention friend feed ', () => {

  })

  it ('update my feed', () => {

  })

  it ('delete my feed', () => {

  })


}) 