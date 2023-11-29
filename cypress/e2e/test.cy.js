

describe('template spec', () => {
  
  it('test get user data successfully', () => {
    cy.fixture('badges-me-pin__POST').then((badges) => {
      
      const resp = {
        "pinnedBadgeIds": ["abc"]
      }
      cy.validateSchema(badges.schema[200], resp)
    
    
    
    })
  })
})