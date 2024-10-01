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

  cy.get(".game_status").eq(0)
    .click()
    .wait(1000)
   
  // Perform the drag and drop action of a Card dropped on the correct field position
  cy.dropPlayerCardOnCorrectFieldPosition()

  // Perform the drag and drop action of a Card dropped on an incorrect field position
  cy.dropPlayerCardOnIncorrectFieldPosition()
  cy.clickSearchAndTypeLeftBack() // Dropped the Player Card on correct position
  cy.get('[class="player_type"]').contains('Left Back').eq(0).trigger('dragstart');
  cy.get('[class="position-absolute player_1"]').trigger('drop').wait(200);
  
  // Perform the drag and drop action of a Card dropped on the Incorrect field position
  cy.dropPlayerCardOnIncorrectBenchPosition()
  
  // Perform the drag and drop action of a Card dropped on the correct field position
  cy.dropPlayerCardOnCorrectBenchPosition()
  cy.get('.compose-team', {timeout:5000}).click()
  cy.get('[class="complete"]').click();

  // Edit the team in Divsion Page
  cy.get('[class="null nav-item tab mx-4 "]').click()
  cy.get('[data-tip="edit"]').click()

  cy.clickSearchAndTypeLeftBack()

  // Add another assertion to check the Compose Team without completing the lineup
  cy.get(':nth-child(6) > .position-absolute > .poligon > .img_box > img').click()
  cy.get('.cross').eq(0).click()
  cy.get('.compose-team').click()
  cy.get('.MuiAlert-message', {timeout:2000}).should('have.text', 'Complete the team to proceed.')

  // Perform the drag and drop action again to complete the lineup
  cy.get('[class="form-control search"]').click()
  cy.get('[class="form-control search"]').clear()
  cy.get('[class="player_type"]').contains('Right Back').eq(1).trigger('dragstart'); // Drag and drop Left back on an incorrect bench position
  cy.get('[class="position-absolute player_6"]').trigger('drop');
  cy.get('.compose-team', {timeout:5000}).click()
  
  // Continue with the rest of your test
  cy.get('[class="complete"]').click();

  // Edit the team using edit option on Division Page
  cy.get('[class="null nav-item tab mx-4 "]').click()
  cy.get('[class="Standard Division"]').contains('Standard Division').click().wait(250)
  cy.get('[class="MuiTypography-root MuiTypography-body1 css-rtcy2w"]').contains('Team').click()
  cy.contains("Edit Team").click().wait(250)
  cy.get('.compose-team', {timeout:5000}).click()
  cy.get('[class="complete"]').click();

  // Edit the team using edit option on My Team page
  cy.get('[class="null nav-item tab"]').contains('My Teams').click()
  cy.get('[style="margin-left: 5px;"]').contains('Edit Team').click()
  cy.get('.compose-team', {timeout:5000}).click()
  cy.get('[class="complete"]').click();

  // Perform the drag and drop action for item cards
  // cy.contains('Player Cards').click().wait(250)
  // cy.contains('Item Cards').click().wait(250)
  // cy.get('[class="form-control search"]').click()
  // cy.get('[class="form-control search"]').type('Player').wait(250)
  // cy.get('[class="name mb-1"]').eq(0).trigger('dragstart') // Drag and drop Left back on a player position
  // cy.get('[class="position-absolute player_1').trigger('drop')
  
  // cy.dragAndDropItemCard();

  });

  // Logout of the application
  afterEach('Logout the application' , () => {
    cy.get('[class="user_menu_wrapper"]').click()
    cy.contains('Logout').click()
  })
});