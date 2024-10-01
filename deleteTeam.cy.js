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

  // Delete an already created team
  cy.get('.mx-4').click().wait(750)
  cy.get('[class="delete"]').eq(1).click().wait(750)
  cy.get('[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-4nkg28"]').click().wait(750)
  cy.get('[class="MuiBox-root css-1sad3v0"]').click().wait(750)
  cy.get('[class="join-button"]').eq(1).click().wait(750)
  
     // Create a new team using filter and search option
    const checkAndReload = () => {
      cy.createTeam().wait(10);

      // Check if the URL changes before checking for the error message
      const checkUrlAndContinue = () => {
        cy.url().then((currentUrl) => {
          if (currentUrl.includes('/home')) {
            // If the URL changes, click the "Continue" button or perform other actions
            cy.get('[class="complete"]').click(); // Adjust the selector based on your application's actual button class
            return;
          }

          // Check if the error message is visible
          cy.get('[class="MuiAlert-message css-1xsto0d"]', { timeout: 10 }).contains('Complete the team with minimum 4 players from division basic').then((errorElement) => {
            if (errorElement.length > 0) {
              // If the error message is visible, wait and then recursively call the function
              cy.wait(10, { log: false }).then(() => {
                checkAndReload(); // Recursively call the function
              });
            }
          });
        });
      };

      // Start the process
      checkUrlAndContinue();
    };

    // Start the process again
    checkAndReload();
  });

  // Delete the team from the Team Option of Divison Tab
  afterEach('Delete the team from Team Option' , () => {
    cy.get('[class="null nav-item tab mx-4 "]').click()
    cy.get('[class="Basic Division"]').contains('Basic Division').click().wait(250)
    cy.get('[class="MuiTypography-root MuiTypography-body1 css-rtcy2w"]').contains('Team').click()
    cy.contains("Delete Team").click().wait(250)
    cy.get('[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-4nkg28"]').click().wait(750)
    cy.get('[class="MuiBox-root css-1sad3v0"]').click().wait(750)


    // cy.get('[class="user_menu_wrapper"]').click()
    // cy.contains('Logout').click()
  })
});