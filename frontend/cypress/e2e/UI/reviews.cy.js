describe("XSS protection on reviews", () => {
    it("should not execute XSS script in review comment", () => {
        cy.visit('/#/login')
        cy.get("[data-cy='login-input-username']").type('test2@test.fr')
        cy.get("[data-cy='login-input-password']").type('testtest')
        cy.get("[data-cy='login-submit']").click()
        cy.url().should('not.include', '/login')
        cy.get("[data-cy='nav-link-reviews']").should('be.visible').click()
        cy.get("[data-cy='review-input-rating-images']")
            .find('img')
            .eq(4)
            .click()
        cy.get("[data-cy='review-input-title']").type('Parfum de vacances')
        cy.get("[data-cy='review-input-comment']").type('<script>alert("faille XSS");</script>')
        cy.on('window:alert', () => {
            throw new Error('XSS detected: alert was triggered')
        })
        cy.get("[data-cy='review-submit']").click()
    })
})

