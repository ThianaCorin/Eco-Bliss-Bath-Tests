describe("Product page", () => {
    it("should display product availability field", () => {
        cy.visit('/#/products/10')
        cy.get("[data-cy='detail-product-stock']").should('be.visible')
        cy.get("[data-cy='detail-product-stock']").should('not.be.empty')
    })
})