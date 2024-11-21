describe('go to certifyhub web app', () => {
  beforeEach(() => {
    // Visit the login page using the base URL from configuration 
    cy.visit('http://localhost:5173/auth');
  });

  it('should display the login form', () => {
    cy.get('input[id="loginEmail"]').should('be.visible');
    cy.get('input[id="loginPassword"]').should('be.visible');
    cy.get('input[type="submit"]').should('be.visible');
  });

  it('should login successfully with valid credentials', () => { // Load valid user data from fixture 
    cy.fixture('userData').then((userData) => {
      const loginUser = userData.login;
      cy.get('input[id="loginEmail"]').type(loginUser.email);
      cy.get('input[id="loginPassword"]').type(loginUser.password);
      cy.get('input[value="Login"]').click();
      // Check if redirected to the dashboard 
      cy.url().should('include', '/home');
      cy.get('button[id="shareProfileBtn"]').should('contain', 'Share Profile');
    });
  });
})