describe("Login flow", () => {
  const APP_URL = "http://localhost:5174";
  const BACKEND_URL = "http://localhost:3000/api/";

  beforeEach(() => {
    cy.visit(`${APP_URL}/login`);
  });

  it("muestra el formulario de login", () => {
    cy.get('input[name="Email"]').should("be.visible");
    cy.get('input[name="Contraseña"]').should("be.visible");
    cy.get('button[type="button"]')
      .contains(/iniciar sesión/i)
      .should("be.enabled");
  });

  it("redirige a home después de credenciales válidas", () => {
    cy.intercept("POST", "**/auth/login").as("loginReq");

    cy.get('input[name="Email"]').type("carlosjoelsalda@gmail.com");
    cy.get('input[name="Contraseña"]').type("test1234");
    cy.get('button[type="button"]')
      .contains(/iniciar sesión/i)
      .should("be.enabled")
      .click();
    cy.wait("@loginReq").its("response.body.status").should("eq", "success");
    cy.url().should("include", `${APP_URL}/home`);

    cy.get("p").should("contain", "No hay productos");
  });

  it("Login falla si no se escriben credenciales", () => {
    cy.intercept("POST", `${BACKEND_URL}auth/login`, {
      statusCode: 400,
      body: { status: "success" },
    }).as("loginReq");

    cy.get('button[type="button"]')
      .contains(/iniciar sesión/i)
      .should("be.enabled")
      .click();
    cy.wait("@loginReq");

    cy.get("p").contains(/email o contraseña incorrectos/i);
  });
});
