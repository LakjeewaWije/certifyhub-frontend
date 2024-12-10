describe('go to certifyhub web app', () => {
  beforeEach(() => {
    // Visit the login page using the base URL from configuration 
    cy.visit('http://localhost:5173/home');

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

  it('it should create a new certificate', () => {
    cy.get('a.bg-blue-500.text-white').contains('Add New Certificate').click();
    cy.url().should('include', '/certificate');
    cy.get('#name').type('Test Certificate Name')
    cy.get('#category').select('1');
    // Select by index or value 
    cy.get('#description').type('This is a test description for the certificate.');
    cy.get('#dateAwarded').type('2023-12-10');
    cy.get('#uploaded_file').selectFile('test-upload.pdf')

    cy.get('input[type="submit"]').click();
    cy.wait(2000)
    cy.contains('Test Certificate Name').should('exist');
  });

  it('it should edit a certificate', () => {
    // Check if redirected to the dashboard 
    cy.url().should('include', '/home');
    // Assuming the certificates are loaded dynamically 
    cy.get('#certi0').within(() => {
      cy.get('a').contains('Edit').click();
    });
    cy.wait(2000)
    cy.url().should('include', '/certificate');
    cy.get('#name').clear().type('Test Certificate Name New');

    cy.get('input[type="submit"]').click();
    cy.wait(2000)
    cy.contains('Test Certificate Name New').should('exist');
  });

  it('it should delete a certificate', () => {
    // Check if redirected to the dashboard 
    cy.url().should('include', '/home');
    // Assuming the certificates are loaded dynamically 
    cy.get('#certi0').within(() => {
      cy.get('button').contains('Delete').click();
    });
    cy.wait(4000)
    // Add assertions to verify the certificate was deleted 
    cy.get('#certi0').should('not.exist');

  });
})