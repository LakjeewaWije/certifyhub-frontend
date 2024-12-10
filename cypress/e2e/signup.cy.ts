describe('aignup to certifyhub', () => {
  beforeEach(() => {
    // Visit the login page using the base URL from configuration 
    cy.visit('https://certifyhub-frontend.vercel.app/auth');
  });

  it('should display the signup form', () => {
    cy.get('a[href="#link2"]').click();
    cy.get('input[id="signupFirstName"]').should('be.visible');
    cy.get('input[id="signupLastName"]').should('be.visible');
    cy.get('input[id="signupEmail"]').should('be.visible');
    cy.get('input[id="signupPassword"]').should('be.visible');
    cy.get('input[id="signupBtn"]').should('be.visible');
  });

  it('should signup successfully with valid credentials', () => {
    // Load valid user data from fixture 
    cy.fixture('userData').then((userData) => {
      cy.get('a[href="#link2"]').click();
      const signupUser = userData.signup;
      cy.get('input[id="signupFirstName"]').type(signupUser.firstName);
      cy.get('input[id="signupLastName"]').type(signupUser.lastName);
      cy.get('input[id="signupEmail"]').type(signupUser.email);
      cy.get('input[id="signupPassword"]').type(signupUser.password);
      cy.get('input[id="signupBtn"]').click();
      // Check if redirected to the dashboard 
      cy.url().should('include', '/auth');
      cy.get('input[id="loginEmail"]').should('be.visible');
    });
  });
})