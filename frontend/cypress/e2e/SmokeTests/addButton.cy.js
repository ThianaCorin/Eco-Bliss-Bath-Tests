describe("Checks add a product button", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })
    it("should show an add button when user is connected", () => {
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").type('test2@test.fr')
        cy.get("[data-cy='login-input-password']").type('testtest')
        cy.get("[data-cy='login-submit']").click()
        cy.url().should('not.include', '/login')
        cy.visit('/#/products/3')
        cy.get("[data-cy='detail-product-add']").should('be.visible')


    })
})