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
  
    // Perform the Add fund functionality
    cy.get('[class="MuiBox-root css-178gshy"]').click()
    cy.get('[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1fret22"]').click()
    cy.get('[class="MuiInputBase-input MuiInput-input css-mnn31"]').click().type('26').wait(500)
    cy.get('[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-fon2i7"]', {timeout:1000}).click()
    cy.get('[class="error-input"]').should('have.text', 'Your input is outside the valid range. Please choose a number between 1 and 25.')
    cy.get('[class="MuiInputBase-input MuiInput-input css-mnn31"]').click().clear()
    cy.get('[class="MuiInputBase-input MuiInput-input css-mnn31"]').click().type('5')
    cy.get('[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-fon2i7"]', {timeout:20000}).click()
    
        // cy.intercept('GET', '/pk_test_51NbqyAGRHrfcXGiIKmuTun2v33Xkbm7fTUAEIVECteQ2I0VSTpm57yqedus94l9InsZeSVXFsUWboqzwe45alPET00YkEJZ8Jx/#fidkdWxOYHwnPyd1blpxYHZxWjA0S2d0fERCV013Y2ZdQmxMTmhwUXBrN3M2Nl1uZ2gyY1FQREBMU0BGcWBUN0w1U1ZRdWgwMnx0YGFwdjwxaTxMa3ZfYFZTXUN2UFJnanR%2FcmAxMGRpVUBRNTVcbkBPXz1PfScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl', {
    //   statusCode: 200,
    //   body: { key: 'value' },
    // }).as('getSomeData');
    // let currentURL;
    // cy.url().then((url) => {
    //   currentURL = url;
    // }).then(() => {
    //   // Now that currentURL is set, visit it
    //   cy.visit(currentURL);
    // });

      // Enter your payment details
      // cy.get('[class="CheckoutInput Input Input--empty"]').type("zeeshan@yopmail.com")
      // cy.get('[class="CheckoutInput CheckoutInput--tabularnums Input Input--empty"]').type("4242424242424242")
      // cy.get('[class="]')
      // cy.get('[class="CheckoutInput CheckoutInput--tabularnums Input Input--empty"]').type("123")
   
    })
})