describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/", { failOnStatusCode: false });

    // Find a link with an href attribute containing "sign-in" and click it
    cy.get('a[href*="/sign-in"]').click();
    // Type the login credentials
    cy.get('input[type*="email"]').type("test@example.com{enter}");
    cy.get('input[type*="password"]').type("password{enter}");

    cy.get('button[class *= "cl-formButtonPrimary"]').click();
    // Wait for the login to finish running
    cy.wait(1200);
    // The new url should include "/home"
    cy.url().should("include", "/home");
  });
});
