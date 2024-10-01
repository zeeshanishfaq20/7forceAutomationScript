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
      })
  
      cy.url().should('include', `${Cypress.config('baseUrl')}loginsucess`).wait(20000);
    
      // Validate final redirection to signup page
      cy.url().should('include', `${Cypress.config('baseUrl')}home?network=testnet`);

      // Click the continue button
      cy.get('.MuiButtonBase-root').click().wait(2000)
      
      // Verify the image upload functionality of the application
      cy.get('[class="clip-path-circle user_menuu"]').click().wait(2000) 
      cy.get('[class="px-2 curser_pointer"]').click().wait(2000)
      cy.get('[class="MuiTypography-root MuiTypography-body1 css-1f7v5ct"]').click().wait(2000)
      
      // Upload a jpg image with a size of less than 2mb on the page.
      cy.get('.MuiFormLabel-root').selectFile("../10pu-cypress/cypress/fixtures/ghi.jpg");
      cy.get('[class=" ml-2 mt-2 MuiBox-root css-1j2sy3q"]').should('have.text', 'Image should be in PNG format').wait(1000)

      // Upload a png image with a size of over 2mb on the page.
      cy.get('.MuiFormLabel-root').selectFile("../10pu-cypress/cypress/fixtures/def.png");
      cy.get('[class=" ml-2 mt-2 MuiBox-root css-1j2sy3q"]').should('have.text', 'Image size should not be more than 2mb').wait(1000)

      // Upload a png image with a size of less than 2mb on the page.
      cy.get('.MuiFormLabel-root').selectFile("../10pu-cypress/cypress/fixtures/abc.png");
      cy.get('[class="MuiTypography-root MuiTypography-body1 css-mgmt3h"]').click().wait(1000)
    });

    // Logout of the application
    afterEach('Logout the application' , () => {
        cy.get('[class="user_menu_wrapper"]').click()
        cy.contains('Logout').click()
    })

  // Logout of the application
  afterEach('Logout the application' , () => {
    cy.get('[class="user_menu_wrapper"]').click()
    cy.contains('Logout').click()
  })
});