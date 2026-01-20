describe("Checks login button", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })
    it("should show login button in the homepage", () => {
        cy.visit('/#/')
        cy.get("[data-cy='nav-link-login']").should('be.visible')
    })
})