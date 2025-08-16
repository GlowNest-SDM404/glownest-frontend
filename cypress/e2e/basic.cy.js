it('registers, logs out from profile, and logs in again', () => {
  let testEmail = `testuser${Date.now()}@example.com`;
  let testPassword = 'TestPassword123';

  // Sign up
  cy.visit('http://localhost:5173');
  cy.wait(2000);
  cy.contains(/register now/i).click();
  cy.wait(2000);

  cy.url().should('include', '/register');
  cy.wait(1000);

  cy.get('input[placeholder*="First Name"]').type('Test');
  cy.wait(1000);
  cy.get('input[placeholder*="Last Name"]').type('User');
  cy.wait(1000);
  cy.get('input[placeholder*="Email"]').type(testEmail);
  cy.wait(1000);
  cy.get('input[placeholder*="Phone Number"]').type('1234567890');
  cy.wait(1000);
  cy.get('input[placeholder*="Password"]').type(testPassword);
  cy.wait(1500);

  cy.get('button').contains(/sign up/i).click();
  cy.wait(2000);

  cy.url().should('eq', 'http://localhost:5173/');
  cy.contains(/glownest/i);
  cy.wait(5000);

  // Go to profile and log out
  cy.visit('http://localhost:5173/profile');
  cy.wait(4000);
  cy.contains(/logout/i).click();
  cy.contains(/login/i);
  cy.wait(1500);

  // Log in again
  cy.get('input[placeholder*="Email"]').type(testEmail);
  cy.wait(500);
  cy.get('input[placeholder*="Password"]').type(testPassword);
  cy.wait(1000);
  cy.get('button').contains(/login/i).click();
  cy.wait(2000);

  cy.url().should('eq', 'http://localhost:5173/');
  cy.contains(/glownest/i);
  cy.wait(2000);
});