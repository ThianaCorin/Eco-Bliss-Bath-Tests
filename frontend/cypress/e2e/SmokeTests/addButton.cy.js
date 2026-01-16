describe("Checks add a product button", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })
    it("should show an add button when user is connected", () => {
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").type('test2@test.fr')
        cy.get("[data-cy='login-input-password']").type('testtest')
        cy.get("[data-cy='login-submit']").click()
        cy.get("[data-cy='product-home-link']").should('be.visible')
        cy.get("[data-cy='product-home-link']").first().click()
        cy.get("[data-cy='detail-product-add']").should('be.visible')
    })
})

