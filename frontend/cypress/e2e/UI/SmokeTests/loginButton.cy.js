describe("Smoke test - Login elements", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })

    it("should show login button in the homepage", () => {
        cy.visit('/#/')
        cy.get("[data-cy='nav-link-login']").should('be.visible')
    })

    it("should show login form fields on login page", () => {
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").should('be.visible')
        cy.get("[data-cy='login-input-password']").should('be.visible')
        cy.get("[data-cy='login-submit']").should('be.visible')
    })
})