/// <reference types = "cypress"/>

describe('Login to test AuthO authentication', () => {
    beforeEach (() => {
  
      // Visit the Landing page of the application
      cy.visit('https://staging.7force.app/?network=testnet')
    })
    
    it('Redirected to the auth0 and verify the login details', () => {
  
      // Wait to be redirected to the login page hosted by AuthO
      cy.get('.css-1y6ic72 > .MuiButtonBase-root').click().wait(2000)
  
      // Redirect to the auth0 login page
      cy.origin('https://7force-test.eu.auth0.com/login', () => {
  
        // Complete the login details
        cy.get('#1-email').click()
        cy.get('#1-email').type('zeeshan@yopmail.com')
        cy.get('#1-submit').click().wait(10000)
  
        // Click on the Verify button
        cy.get('#1-submit').click().wait(3000)
      }
    )
  
    cy.url().should('include', `${Cypress.config('baseUrl')}loginsucess`).wait(10000);
  
    // Validate final redirection to signup page
    cy.url().should('include', `${Cypress.config('baseUrl')}home?network=testnet`);
  
    // Click the continue button
    cy.get('.MuiButtonBase-root').click().wait(2000)

    // Click the collection button to view the collection of the cards
    cy.get('[class="ml-1"]').eq(1).click()

    // Test the various Rarity functionalities on the page
    cy.testRarityCheckBoxes()

    // Test the Search Functionality in Collection
    cy.testSearchOptions()

    });
  })
  